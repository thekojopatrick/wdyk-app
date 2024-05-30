import * as React from "react";
import { showMessage } from "react-native-flash-message";
import { Stack } from "expo-router";
import { useAddPost } from "@/api";
import { Button, ControlledInput, showErrorMessage, View } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(10),
  body: z.string().min(120),
});

type FormType = z.infer<typeof schema>;

// function CreatePost() {
//   const utils = api.useUtils();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const { mutate, error } = api.post.create.useMutation({
//     async onSuccess() {
//       setTitle("");
//       setContent("");
//       await utils.post.all.invalidate();
//     },
//   });

//   return (
//     <View className="mt-4 flex gap-2">
//       <TextInput
//         className=" items-center rounded-md border border-input bg-background px-3 py-4 text-lg leading-[1.25] text-foreground"
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Title"
//       />
//       {error?.data?.zodError?.fieldErrors.title && (
//         <Text className="mb-2 text-destructive">
//           {error.data.zodError.fieldErrors.title}
//         </Text>
//       )}
//       <TextInput
//         className="items-center rounded-md border border-input bg-background px-3 py-4  text-lg leading-[1.25] text-foreground"
//         value={content}
//         onChangeText={setContent}
//         placeholder="Content"
//       />
//       {error?.data?.zodError?.fieldErrors.content && (
//         <Text className="mb-2 text-destructive">
//           {error.data.zodError.fieldErrors.content}
//         </Text>
//       )}
//       <Pressable
//         className="flex items-center rounded bg-primary p-2 py-4"
//         onPress={() => {
//           mutate({
//             title,
//             content,
//           });
//         }}
//       >
//         <Text className="text-primary-foreground">Create</Text>
//       </Pressable>
//       {error?.data?.code === "UNAUTHORIZED" && (
//         <Text className="mt-2 text-destructive">
//           You need to be logged in to create a post
//         </Text>
//       )}
//     </View>
//   );
// }

export default function AddPost() {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isPending } = useAddPost();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addPost(
      { ...data, userId: 1 },
      {
        onSuccess: () => {
          showMessage({
            message: "Post added successfully",
            type: "success",
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage("Error adding post");
        },
      },
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerBackTitle: "Feed",
        }}
      />
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="title"
          label="Title"
          control={control}
          testID="title"
        />
        <ControlledInput
          name="body"
          label="Content"
          control={control}
          multiline
          testID="body-input"
        />
        <Button
          label="Add Post"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
      </View>
    </>
  );
}
