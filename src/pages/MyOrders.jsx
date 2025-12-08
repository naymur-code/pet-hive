import axios from "axios";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://pet-server1.vercel.app/orders?email=${user.email}`)
      .then((result) => setOrder(result.data))
      .catch((error) => console.log(error));
  }, [user?.email]);

  const downloadReport = () => {
    if (!order.length) return;

    const doc = new jsPDF();
    autoTable(doc, { html: "#my-table" });

    // Or use javascript directly:
    const rows = order.map((o) => [
      o.listingName,
      o.buyerName,
      o.buyerEmail,
      `$${o.price}`,
      o.quantity,
      o.address,
      o.date,
      o.phone,
    ]);
    autoTable(doc, {
      head: [
        [
          "Listing Name",
          "Buyer Name",
          "Buyer Email",
          "Price",
          "Quantity",
          "Address",
          "Date",
          "Phone",
        ],
      ],

      body: rows,
    });

    doc.save("PetHive-Report.pdf");
  };

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-5xl font-bold my-10">My Orders</h1>

      <button
        onClick={downloadReport}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 mb-5"
      >
        Download Report
      </button>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white mt-5 mb-30">
        <table className="table table-zebra">
          <thead className="text-lg bg-gray-200">
            <tr>
              <th>Listing Name</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {order.map((data) => (
              <tr key={data._id} className="hover">
                <td>{data.listingName}</td>
                <td>{data.buyerName}</td>
                <td>{data.buyerEmail}</td>
                <td className="font-bold text-green-700">${data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.address}</td>
                <td>{data.date}</td>
                <td>{data.phone}</td>
              </tr>
            ))}
            {order.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
