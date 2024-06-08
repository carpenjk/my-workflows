
export const setTextAreaHeight = (textAreaElement: HTMLTextAreaElement ) => {
    const scrollHeight = textAreaElement.scrollHeight;
    console.log("🚀 ~ setTextAreaHeight ~ scrollHeight:", scrollHeight)
    textAreaElement.style.height = textAreaElement.scrollHeight + "px";
}

