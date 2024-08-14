import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Divider from '@mui/joy/Divider';
import AttachedRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DialogActions from '@mui/joy/DialogActions';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { DataGrid } from '@mui/x-data-grid';

function AdControlPanel() {
  const [adFile, setAdFile] = useState(null);
  const [adType, setAdType] = useState('image'); // Default value set to 'image'
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { setMode } = useColorScheme();
  const [files, setFiles] = useState([]); // State to hold fetched files
  const [open, setOpen] = useState(false); // Modal open state
  const [uploadOpen, setUploadOpen] = useState(false); // Upload modal open state
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file for modal
  const [delopen, delsetOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null); // State to hold the ID of the file to delete
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // Set the mode to light by default
  React.useEffect(() => {
    setMode('light');
  }, [setMode]);

  // Fetch files from the database on component mount
  // Fetch files from the database
  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://localhost:7154/api/ad/files");
      setFiles(response.data); // Update the state with the fetched files
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to fetch files.");
    }
  };

  // Fetch files when the component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setUploadOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7154/api/ad/delete/${selectedFileId}`);
      toast.success("File deleted successfully.");
      delsetOpen(false);
      setFiles(files.filter(file => file.id !== selectedFileId)); // Remove the deleted file from the UI
    } catch (error) {
      console.error("File deletion failed:", error);
      toast.error("Failed to delete the file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setAdFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedTypes = getAcceptedFileTypes();

    if (selectedFile && !selectedFile.type.match(acceptedTypes)) {
      toast.error(`Invalid file type. Please select a valid ${adType}.`);
      setAdFile(null);
      fileInputRef.current.value = ''; // Clear the file input
    } else {
      setAdFile(selectedFile);
    }
  };

  const handleChange = (event, newValue) => {
    setAdType(newValue);
    setAdFile(null); // Reset the file input when ad type changes
    fileInputRef.current.value = ''; // Clear the file input
  };

  const getAcceptedFileTypes = () => {
    switch (adType) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'pdf':
        return 'application/pdf';
      case 'pptx':
        return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
      default:
        return '';
    }
  };

  const handleAdUpload = async () => {
    if (!adFile) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", adFile);
    formData.append("adType", adType);

    try {
      const response = await axios.post(
        "https://localhost:7154/api/ad/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Ad uploaded successfully:", response.data);
      toast.success("Ad uploaded successfully.");
      setOpen(false);
      await fetchFiles();; // Close the modal on successful upload
    } catch (error) {
      console.error("Ad upload failed:", error);
      toast.error("Ad upload failed.");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFiles = files.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(files.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <CssVarsProvider defaultMode="light">
      <div className="w-full">
        <ToastContainer />
        <div className="bg-blue-600 p-4 text-left rounded-lg shadow-lg text-white text-xl mx-2 mt-2">
          Upload Ad
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full px-2">
              <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                <div className="bg-white px-4 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">All Files</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      A list of all the files in your account including their Image, Video, Pdf, and Pptx.
                    </p>
                  </div>
                  <div>
                    <Button
                      type="button"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                      onClick={() => setOpen(true)}
                    >
                      <Add /> Add File
                    </Button>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ad Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Path
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file) => (
                      <tr key={file.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className="text-sm text-blue-600 cursor-pointer"
                            onClick={() => handleFileClick(file)}
                          >
                            {file.fileName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{file.adType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{file.url}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outlined"
                            color="danger"
                            onClick={() => {
                              setSelectedFileId(file.id);
                              delsetOpen(true);
                            }}
                          >
                            <DeleteForever />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>



        {/* Modal for displaying selected file */}
        <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
          <ModalDialog>
            <DialogTitle>Media Preview</DialogTitle>
            <Divider />
            <DialogContent>
              {selectedFile && (
                <>
                  {selectedFile.adType === 'image' && (
                    <img src={`https://localhost:7154${selectedFile.url}`} alt={selectedFile.fileName} className="w-full h-72" />
                  )}
                  {selectedFile.adType === 'video' && (
                    <video autoPlay
                      loop
                      muted className="w-full h-72">
                      <source src={`https://localhost:7154${selectedFile.url}`} type="video/mp4" />
                    </video>
                  )}
                  {selectedFile.adType === 'pdf' && (
                    <embed src={`https://localhost:7154${selectedFile.url}`} type="application/pdf" width="100%" height="300px" />
                  )}
                  {selectedFile.adType === 'pptx' && (
                    <iframe src={`https://localhost:7154${selectedFile.url}`} title={selectedFile.fileName} width="100%" height="300px" />
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="solid" color="primary" onClick={() => setUploadOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>

        {/* Modal for file upload */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>  <WarningRoundedIcon />Upload New Ad</DialogTitle><Divider />
            <DialogContent>
              <div className="p-6 mx-1 mt-1">
                <Select
                  value={adType}
                  onChange={handleChange}
                  color="neutral"
                  sx={{ minWidth: 200, mb: 2 }}
                >
                  <Option value="image">Image</Option>
                  <Option value="video">Video</Option>
                  <Option value="pdf">Pdf</Option>
                  <Option value="pptx">Pptx</Option>
                </Select>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center mb-2 cursor-pointer ${dragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()} // Trigger input click on div click
                >
                  {adFile ? (
                    <p className="text-gray-700">{adFile.name}</p>
                  ) : (
                    <p className="text-gray-500">Drag & drop a file here, or click to select a file</p>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept={getAcceptedFileTypes()} // Set accepted file types based on adType
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button variant="solid" color="primary" onClick={handleAdUpload}>
                Save
              </Button>
              <Button variant="plain" color="warning" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>


        <Modal open={delopen} onClose={() => delsetOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to delete this file?
            </DialogContent>
            <DialogActions>
              <Button variant="solid" color="danger" onClick={handleDelete}>
                Discard
              </Button>
              <Button variant="plain" color="neutral" onClick={() => delsetOpen(false)}>
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </div>
    </CssVarsProvider>
  );
}

export default AdControlPanel;
