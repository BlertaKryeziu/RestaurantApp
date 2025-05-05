{/*export const fetchTables = async () => {
    const res = await fetch("/api/tables");
    return res.json();
  };*/}

 // src/api/tables.js

export const fetchTables = async () => {
  const res = await fetch("http://localhost:5000/api/tables");
  const data = await res.json();
  return data;
};

  
  