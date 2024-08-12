import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';




const data = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

const handleEdit = (id) => {
  console.log('Edit item with id:', id);
};

const handleDelete = (id) => {
  console.log('Delete item with id:', id);
};

const AllApps = () => {
  return (
    <div className="w-full">
      <div className="bg-blue-600 p-4 text-left rounded-lg shadow-lg text-white text-xl mx-1 mt-2">
        Dashboard
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white rounded-lg shadow-lg p-6 mx-1 mt-2" style={{ width: '99%' }}>
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">#</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white rounded-lg shadow-lg p-6 mx-1 mt-2" style={{ width: '99%' }}>
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">#</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white rounded-lg shadow-lg p-6 mx-1 mt-2" style={{ width: '99%' }}>
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">#</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white rounded-lg shadow-lg p-6 mx-1 mt-2" style={{ width: '99%' }}>
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">#</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllApps;
