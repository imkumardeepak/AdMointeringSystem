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



      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full  px-2">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <div className="bg-white px-4 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Users</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    A list of all the users in your account including their name, title, email and role.
                  </p>
                </div>
                <div>
                  <button type="button" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                    Add user
                  </button>
                </div>
              </div>


              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Lindsay Walton
                          </div>
                          <div className="text-sm text-gray-500">
                            lindsay.walton@example.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Front-end Developer</div>
                      <div className="text-sm text-gray-500">Optimization</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Member
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>


                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>




    </div >
  );
};

export default AllApps;
