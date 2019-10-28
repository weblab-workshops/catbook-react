export const getProfile = (id) => {
	    fetch("/api/user?_id=" + id)
	        .then(res => res.json())
		}


export const getStories = () => {
    fetch('/api/stories')
    .then(res => res.json())
};


export const getComments = (storyId) => {
  return fetch(`/api/comment?parent=${storyId}`)
    .then(res => res.json())
};

export const addStory = (content) => {
    const body = { 'content': content };
    fetch('/api/story', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};


export const addComment = (parent, content) => {
    const body = {'parent': parent, 'content': content };
    fetch('/api/comment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    });
};
