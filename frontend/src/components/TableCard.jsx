const TableCard = ({ table, onClick }) => {
    return (
      <div
        onClick={() => onClick(table)}
        className={`p-4 rounded-2xl shadow-md cursor-pointer text-center ${
          table.status === 'Available' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <h2 className="text-lg font-bold">Tavolina {table.table_name}</h2>
        <p>Status: {table.status}</p>
      </div>
    );
  };
  
  export default TableCard;
  