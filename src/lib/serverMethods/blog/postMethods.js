// On va créer les méthodes qui vont nous permettre d'afficher nos articles depuis la base de donnée //
import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";

export async function getPost(slug) {
  try {
    await connectToDB();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.error("error while fetch  a post", error)
    throw new Error("Failed to fetch post");
  }
}


// Créer un getPost pour récupérer tous les  articles // 

export async function getPosts() {
  try {
    await connectToDB();
    const posts = await Post.find({})
    return posts 

    
  } catch (error) {
    
    
  }

}