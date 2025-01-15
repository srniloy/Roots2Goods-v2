import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Link from 'next/link';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField , Autocomplete} from '@mui/material';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Loading, { Loader, SubLoader } from '@app/loading';
import { CreateNewProject } from '@services/fd-service/dashboard_service';

const FrmrProjects = (props) => {


  const [open, setOpen] = React.useState(false);
  const [projectsType, setProjectsType] = React.useState('Running');
  const [projectsImg, setProjectsImg] = React.useState(undefined);

  const [isLoad, setIsLoad] = React.useState({
    sub: true,
    full: false
  });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setProjectCreateData({
        title: '',
        product_name: '',
        seedling: '',
        land_size: '',
        created_by: props?.user_id,
        start_time: '',
        img: ''
      })
    };





    const ProjectTypeTabButtonAction =(e)=>{
      const allTabs = document.querySelectorAll('#project_type_tabs .project_type_tab');

      allTabs.forEach(element => {
        if(element.classList.contains("active")){
          element.classList.remove("active");
        }
      });
      e.target.classList.add("active");
    }


    const shiftProjectImgToLocal = async (img)=>{
      const data = new FormData()
      data.set('img', img)
      const httpData = {
          method: 'POST',
          body: data,
      }
      const res = await fetch(
          `/api/add/img`,
          httpData,
      )
      const resp = await res.json();
      console.log(resp)
    }














    const products = [
      {label: 'Tometo', img: 'tometo.jpg', coverImg: 'poteto-cover.jpg'},
      {label: 'Onion', img: 'onion.jpg', coverImg: 'onion-cover.jpg'},
      {label: 'Eggplant'},
      {label: 'Carrots'},
      {label: 'Cabbage', img: 'image-asset.jpeg', coverImg: 'cabbage.jpg'},
      {label: 'Chilli'},
      {label: 'Watermelon'},
      {label: 'Potato', img: 'poteto.webp', coverImg: 'poteto-cover.jpg'},
    ]
    const [projectCreateData, setProjectCreateData] = React.useState({
      title: '',
      product_name: '',
      seedling: '',
      land_size: '',
      created_by: props?.user_id,
      start_time: '',
      img: ''
    })

    const ProjectCreate = async ()=>{
      if(
        projectCreateData.title != '' &&
        projectCreateData.product_name != '' &&
        projectCreateData.seedling != '' &&
        projectCreateData.land_size != ''
      ){
        // const postData = {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(projectCreateData),
        // };
    
        // const res = await fetch(
        //   '/api/add/project_create',
        //   postData
        // )
        console.log(props?.user_id)
        const response = CreateNewProject(projectCreateData)
        // fetchProjects()
        console.log(response.data);
      }
    }

  const [projects, setProjects] = React.useState(undefined)


    const fetchProjects = async ()=>{
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: props?.user_id, project_type: projectsType}),
      };
  
      const res = await fetch(
        '/api/get/get_projects',
        postData
      )
      const response = await res.json()
      setProjects(response.data)
      console.log(response.data)
    }
    
    useEffect(() => {
      fetchProjects()
    }, []);

    // setTimeout(() => {
    //   console.log(projects)
    // }, 5000);

    useEffect(() => {
      if(projects){
        setIsLoad(ex=>({
          ...ex,
          sub: false
        }))
      }
    }, [projects]);

    useEffect(() => {
      setProjects(undefined)
      fetchProjects()
    }, [projectsType]);

    



  return (
    <div className="w-layout-vflex frmr-projects-box">
      <Loader open={isLoad.full}/>
                <div className="w-layout-hflex frmr-projects-tabs">
                  <div className="w-layout-hflex frmr-project-tab-wrapper" id='project_type_tabs'>
                    <a className="frmr-porject-tab-item active project_type_tab"
                      onClick={(e)=>{
                        ProjectTypeTabButtonAction(e)
                        setProjectsType('Running')
                        
                      }}
                    >Running Projects</a>
                    <a className="frmr-porject-tab-item project_type_tab"
                    onClick={(e)=>{
                      ProjectTypeTabButtonAction(e)
                        setProjectsType('Completed')
                    }}
                    >Completed Projects</a>
                  </div>
                  {/* <a href="#" className="frmr-project-create-btn"><span className="frmr-project-create-plus-icon">+</span></a> */}
                  <Tooltip title='Create Project'>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="#fff"
                      style={{backgroundColor: '#ffffff25'}}
                      onClick={handleClickOpen}
                    >
                      <PostAddIcon className='fd-nav-icon'/>
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

                  <SubLoader open={isLoad.sub}/>

                <div className="fp-project-container">
                  <Suspense>
                  {
                    projects?.map((project)=>{
                      console.log(project)
                      return (
                        <Link onClick={()=> setIsLoad(ex=>({...ex, full: true}))} href={`/users/farmer-dashboard/project-details/${project?.id}`}>
                          <div className="f-project-card">
                            <div className="fp-card-cover-img-wrapper">
                              
                              <img src={`/images/${project?.img}`} className="fp-card-cover-img"/></div>
                            <div className="fp-card-bottom">
                              <h3 className="fp-card-heading">{project?.title}</h3>
                              <div className="fp-project-tag">{project?.status}</div>
                              <div className="fp-project-tag">{project?.start_time}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  }
                
                </Suspense>
                  


                  
                </div>
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
                    onChange={(e)=> {
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
                      onChange={(e,value)=> {
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
                    onChange={(e)=> {
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
                    onChange={(e)=> {
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
                    onChange={(e)=> {
                      setProjectCreateData(ex => ({
                        ...ex,
                        start_time: e.target.value
                      }))
                    }}
                    name='start_time'
                    variant="outlined"
                    />
                    <div style={{padding: '10px 10px 0px'}}>
                        <label for='img-upload' style={{marginBottom: '5px'}}>Upload Project Image</label> <br/>
                        <input type='file' id='img-upload' 
                        onChange={(e)=> {
                          setProjectCreateData(ex => ({
                            ...ex,
                            img: e.target.files[0].name
                          }))
                          setProjectsImg(e.target.files?.[0])
                        }}
                        />
                      </div>
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e)=> {
              e.preventDefault()
              setIsLoad(ex=>({...ex, sub: true}))
              // handleClose()
              // shiftProjectImgToLocal(projectsImg)
              ProjectCreate()
              // fetchProjects()
            }} autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>
              </div>
  )
}

export default FrmrProjects




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