import { PostService } from "../common/PostService";

export const newPost = (body) => async(dispatch) => {
    const response = await(new PostService()).create(body)
    if (response.ok){
        const data = await response.json()
        
        return ''
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again..']
      }
}