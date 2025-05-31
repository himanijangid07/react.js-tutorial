import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
console.log("📦 Redux userData in PostForm.jsx:", userData);


    const submit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!data.slug || data.slug.trim() === "" || data.slug === "-") {
        alert("Slug is invalid. Please enter a valid title.");
        return;
    }

    if (!userData?.$id) {
        alert("User is not logged in or user ID is missing.");
        console.error("userData is missing:", userData);
        return;
    }

    try {
        let fileId = null;

        if (data.image?.[0]) {
            const file = await service.uploadFile(data.image[0]);
            console.log("File uploaded:", file);
            fileId = file?.$id;
        }

        data.featuredImage = fileId;

        console.log("Creating post with data:", {
            ...data,
            userId: userData.$id,
        });

        const dbPost = await service.createPost({
            ...data,
            userId: userData.$id,
        });

        console.log("Post created:", dbPost);

        if (dbPost && dbPost.$id) {
            navigate(`/post/${dbPost.$id}`);
        } else {
            console.error("dbPost is undefined or missing $id");
        }

    } catch (error) {
        console.error("Error during form submission:", error);
    }
};



    const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")     // remove special chars
            .replace(/\s+/g, "-")             // replace spaces with -
            .replace(/-+/g, "-")              // remove duplicate -
            .replace(/^-+|-+$/g, "");         // trim - from start/end
    }
    return "";
}, []);



    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}