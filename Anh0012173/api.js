export const fetchTags = async () => {
    try {
        const response = await fetch('img_tags_beta.json');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        return [];
    }
}