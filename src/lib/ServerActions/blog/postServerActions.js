"use server"
import { connectToDB } from "@/lib/utils/db/connectToDB"
import { connection } from "mongoose"
import { Post } from "@/lib/models/post"


export async function addPost(formData) {
  const { title, markdownArticle} = Object.fromEntries(formData)

  try {
    await connectToDB()
    const newPost = new Post({
      title, 
      markdownArticle
    })
    const savedPost = await newPost.save()
    console.log("Post saved.")
    return {success: true, slug: savedPost.slug}
    
  } catch (error) {
      console.log("error while creating the post :", error)
      throw new Error(error.message || "An error occured while creating the post");
      
  }
}