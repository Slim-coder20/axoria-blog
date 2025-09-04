  import mongoose from "mongoose";
  import slugify from "slugify";


  // On va créer le schema avec Mongoose c'est a dire la structure de nos données // 
  const postSchema = new mongoose.Schema({
    title: {
      type: String, 
      required: true 
    }, 
    markdownArticle: {
      type: String, 
      required: true 
    },
    slug: {
      type: String, 
      unique: true 
    }
  }, {timestamps: true})

  // Utilisation d'un middleware qui va générer un slug à la création du title de l'article // 
  postSchema.pre("save", async function(next){
    if(!this.slug){
      let slugCandidate = slugify(this.title, {lower: true, strict: true })
      
      
      let slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate})
      
      let counter = 1
      // On vérfie si le slug existe déjà // 
      while (slugExist) {
        slugCandidate = `${slugCandidate}-${counter}`
        slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate})
        counter++
        
      }
      this.slug = slugCandidate
      console.log("Final slug", slugCandidate)
    }
    next()
  })


  // On créer notre modele // 
  export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema)