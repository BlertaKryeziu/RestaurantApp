import { useEffect, useState } from "react";
import { fetchTables } from "../../api/tables";
import { fetchOrders } from "../../api/orders";
import TableCard from "../../components/TableCard";
import OrderForm from "../../components/OrderForm";

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orders, setOrders] = useState([]);

  // Merr tavolinat
  useEffect(() => {
    fetchTables().then(setTables);
  }, []);

  // Merr porosit per tavolinen e zgjedhur
  const handleTableClick = async (table) => {
    setSelectedTable(table);
    try {
      const data = await fetchOrders(table.id);
      console.log("Porositë e marra:", JSON.stringify(data, null, 2));

      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Waiter</h1>

      {/* Seksioni i majt: Tavolinat */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} onClick={handleTableClick} />
        ))}
      </div>

      {/* Seksioni i djatht: Detajet e Tavolines dhe Formes se Porosis */}
      {selectedTable && (
        <div className="flex space-x-6">
          {/* Seksioni i Porosive */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Table Orders {selectedTable.table_name}
            </h2>
            <ul className="space-y-2">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <li
                    key={order.id}
                    className="bg-gray-100 p-3 rounded-lg shadow"
                  >
                    {order.items.join(", ")} - {order.status}
                  </li>
                ))
              ) : (
                <p className="italic text-gray-600">
                  There are no orders for this table.
                </p>
              )}
            </ul>
          </div>

          {/* Seksioni per Shtimin e Porosis */}

          <div className="w-80 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Shto një Porosi</h3>
            <OrderForm
              tableId={selectedTable.id}
              onCreate={(newOrder) => setOrders((prev) => [...prev, newOrder])}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
