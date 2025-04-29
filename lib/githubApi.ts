export const fetchGithubData = async (id: string) => {
    const res = await fetch(`https://api.github.com/users/${id}`);
    const data = await res.json();

    if(data.status === 404) {
        return;
    } else {
        return data;
    }
}