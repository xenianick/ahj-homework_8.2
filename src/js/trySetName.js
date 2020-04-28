export default async function trySetName(inputValue) {
  const formData = new FormData();
  formData.append('name', inputValue);
  const response = await fetch('https://ahj-homework-8-2.herokuapp.com', {
    method: 'POST',
    body: formData,
  });
  return response;
}
