import PostModel from "../model/PostModel"

export default async function canCreateCommentCheck(
  post: string,
  postModel: PostModel
) {
  return await postModel.exists(post) // not checking ability to create posts
  // since you can't post a post which doesn't exist
}
