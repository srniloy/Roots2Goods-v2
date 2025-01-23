"use client"
import { IconButton, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';

import UserContext from '@context/userContext';
import { usePathname } from 'next/navigation'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Autocomplete } from '@mui/material';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Loading, { Loader, SubLoader } from '@app/loading';
import { CreateNewProject, GetProjects, GetUserData } from '@services/fd-service/dashboard_service';
// import ProjectCards from './_components/projects_card';
import { useRouter } from 'next/navigation';
import ProjectCards from './_components/projects_card';


const ProjectLayout = ({ children }) => {

    // const [user, setUser] = React.useState(undefined)
    const { user, setUser } = useContext(UserContext)

    let router = useRouter()

    const [open, setOpen] = React.useState(false);

    const [isLoad, setIsLoad] = React.useState({
        sub: true,
        full: false
    });


    const handleClose = () => {
        setOpen(false);
        setProjectCreateData({
            title: '',
            product_name: '',
            seedling: '',
            land_size: '',
            created_by: user?._id,
            start_time: '',
            img: ''
        })
    };





    const ProjectTypeTabButtonAction = (e) => {
        e.preventDefault()
        const allTabs = document.querySelectorAll('#project_type_tabs .project_type_tab');

        allTabs.forEach(element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }
        });
        e.target.classList.add("active");
    }
















    const products = [
        { label: 'Tomato' },
        { label: 'Onion' },
        { label: 'Eggplant' },
        { label: 'Carrot' },
        { label: 'Cabbage' },
        { label: 'Chili' },
        { label: 'Watermelon' },
        { label: 'Potato' },
        { label: 'Sweet Potato' },
    ]
    const [projectCreateData, setProjectCreateData] = React.useState({
        title: '',
        product_name: '',
        seedling: '',
        land_size: '',
        created_by: '',
        start_time: '',
        img: ''
    })




    const ProjectCreate = async () => {
        if (
            projectCreateData.title != '' &&
            projectCreateData.product_name != '' &&
            projectCreateData.seedling != '' &&
            projectCreateData.land_size != ''
        ) {
            const response = CreateNewProject({ project_info: projectCreateData, created_by: user._id })
            console.log(response.data);
            
        }
    }

    const [projects, setProjects] = React.useState(undefined)







    useEffect(() => {
        if (projects) {
            setIsLoad(ex => ({
                ...ex,
                sub: false
            }))
        }
    }, [projects]);


  const urlPath = usePathname()
  const urlParts = usePathname().split("/")
  const end_pathname = urlParts[urlParts.length - 1]


  async function GetAllProjects({ user_id, status }) {
    const { data } = await GetProjects({ user_id, status })
    console.log(data);
    setProjects(data)
  }
  useEffect(() => {
    if (user) {
      GetAllProjects({ user_id: user._id, status: "Running" })
    }
  }, []);


    return (
        <div className="w-layout-vflex frmr-projects-box">
            <Loader open={isLoad.full} />
            <div className="w-layout-hflex frmr-projects-tabs">
                <div className="w-layout-hflex frmr-project-tab-wrapper" id='project_type_tabs'>
                    <p className="frmr-porject-tab-item project_type_tab active"
                        onClick={(e) => {
                            ProjectTypeTabButtonAction(e)
                            GetAllProjects({ user_id: user?._id, status: "Running" })
                        }}
                    >Running Projects</p>
                    <p  className="frmr-porject-tab-item project_type_tab"
                        onClick={(e) => {
                            ProjectTypeTabButtonAction(e)
                            GetAllProjects({ user_id: user?._id, status: "Completed" })
                        }}
                    >Completed Projects</p>
                </div>
                {/* <a href="#" className="frmr-project-create-btn"><span className="frmr-project-create-plus-icon">+</span></a> */}
                <Tooltip title='Create Project'>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="#fff"
                        style={{ backgroundColor: '#ffffff25' }}
                        onClick={() => setOpen(true)}
                    >
                        <PostAddIcon className='fd-nav-icon' />
                    </IconButton>
                </Tooltip>
            </div>
            <div style={{
                width: '100%',
                maxHeight: '450px',
                minHeight: '450px',
                position: 'relative',
                zIndex: 0
            }}>



                <SubLoader open={isLoad.sub} />
                <ProjectCards projects={projects} setIsLoad={setIsLoad} />

            </div>



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create project"}
                </DialogTitle>
                <DialogContent>
                    <form action={ProjectCreate} autoComplete="off" noValidate>
                        <TextField
                            style={{ width: "400px", margin: "10px" }}
                            type="text"
                            required
                            label="Project Title"
                            value={projectCreateData.title}
                            onChange={(e) => {
                                setProjectCreateData(ex => ({
                                    ...ex,
                                    title: e.target.value
                                }))
                            }}
                            name='title'
                            variant="outlined"
                        />
                        <br />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            style={{ width: "400px", margin: "10px" }}
                            options={products}
                            onChange={(e, value) => {
                                setProjectCreateData(ex => ({
                                    ...ex,
                                    product_name: value.label
                                }))
                            }}
                            renderInput={(params) => <TextField {...params} label="Product Name" />}
                        />

                        <TextField
                            style={{ width: "400px", margin: "10px" }}
                            type="number"
                            label="Seedling"
                            name='seedling'
                            value={projectCreateData.seedling}
                            onChange={(e) => {
                                setProjectCreateData(ex => ({
                                    ...ex,
                                    seedling: e.target.value
                                }))
                            }}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            style={{ width: "400px", margin: "10px" }}
                            type="number"
                            label="Land Size (Acr)"
                            value={projectCreateData.land_size}
                            onChange={(e) => {
                                setProjectCreateData(ex => ({
                                    ...ex,
                                    land_size: e.target.value
                                }))
                            }}
                            name='Land'
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            style={{ width: "400px", margin: "10px" }}
                            type="date"
                            focused
                            label="Start Time"
                            value={projectCreateData.start_time}
                            onChange={(e) => {
                                setProjectCreateData(ex => ({
                                    ...ex,
                                    start_time: e.target.value
                                }))
                            }}
                            name='start_time'
                            variant="outlined"
                        />
                        <div style={{ padding: '10px 10px 0px' }}>
                            <label htmlFor='img-upload' style={{ marginBottom: '5px' }}>Upload Project Image</label> <br />
                            <input type='file' id='img-upload'
                                onChange={(e) => {
                                    setProjectCreateData(ex => ({
                                        ...ex,
                                        img: e.target.files[0]
                                    }))
                                }}
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        setIsLoad(ex => ({ ...ex, sub: true }))
                        handleClose()
                        ProjectCreate()
                        GetAllProjects({ user_id: user?._id, status: "Running" })
                    }} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProjectLayout




{/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Edit Profile Information"}
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Name"
                    variant="outlined"
                    value={'Farukh Uddin'}
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="User Type"
                    variant="outlined"
                    value={'Farmer'}
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Phone"
                    variant="outlined"
                    value={'+8801755338427'}
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="NID"
                    variant="outlined"
                    value={'7854 3424 242'}
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Birth Date"
                    variant="outlined"
                    value={'10 Oct, 1985'}
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Address"
                    variant="outlined"
                    value={'North Badda, Dhaka-1208'}
                    />
                    <br />
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
                Update
            </Button>
            </DialogActions>
        </Dialog> */}