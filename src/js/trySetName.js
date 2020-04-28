export default async function trySetName(inputValue) {
  const formData = new FormData();
  formData.append('name', inputValue);
  const response = await fetch('http://localhost:7070', {
    method: 'POST',
    body: formData,
  });
  return response;
}
