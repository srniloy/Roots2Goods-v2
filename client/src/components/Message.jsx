import '@styles/message.css'

const Messages = () => {
  return (
    <div>
      <div class="container">
        <div class="row clearfix">
          <div class="col-lg-12">
            <div class="card chat-app">
              <div id="plist" class="people-list">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul class="list-unstyled chat-list mt-2 mb-0">
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Abdul Karim</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle offline"></i>
                        left 7 mins ago{" "}
                      </div>
                    </div>
                  </li>
                  <li class="clearfix active">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Atik Arnob</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle online"></i>
                        online{" "}
                      </div>
                    </div>
                  </li>
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Sadman Sakib</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle online"></i>
                        online{" "}
                      </div>
                    </div>
                  </li>
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Abdul Karim</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle offline"></i>
                        left 10 hours ago{" "}
                      </div>
                    </div>
                  </li>
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Syed Yousuf Ali</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle online"></i>
                        online{" "}
                      </div>
                    </div>
                  </li>
                  <li class="clearfix">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">Atik Arnob</div>
                      <div class="status">
                        {" "}
                        <i class="fa fa-circle offline"></i>
                        offline since Oct 28{" "}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="chat">
                <div class="chat-header clearfix">
                  <div class="row">
                    <div class="col-lg-6">
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#view_info"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                      </a>
                      <div class="chat-about">
                        <h6 class="m-b-0">Atik Arnob</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div class="col-lg-6 hidden-sm text-right right-text-icons">
                      
                    </div>
                  </div>
                </div>
                <div class="chat-history">
                  <ul class="m-b-0">
                    <li class="clearfix">
                      <div class="message-data text-end">
                        <span class="message-data-time">10:10 AM, Today</span>
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="avatar"
                        />
                      </div>
                      <div class="message other-message float-right">
                        Hi Aiden, how are you? How is the project coming along?{" "}
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message-data">
                        <span class="message-data-time">10:12 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message-data">
                        <span class="message-data-time">10:15 AM, Today</span>
                      </div>
                      <div class="message my-message">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="chat-message clearfix">
                  <div class="input-group mb-0">
                    <div class="input-group-text">
                      <span class="input-group" style={{cursor: 'pointer'}}>
                        <i class="fa fa-send"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter text here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages