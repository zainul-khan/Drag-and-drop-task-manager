const getConfig = () => ({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});

export { getConfig };
