import React, { useEffect, useState } from "react";
import "./Home.css";
import { FcUpLeft } from "react-icons/fc";
import { BiPencil } from "react-icons/bi";
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import ComposeMail from "../ComposeMail/ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/MailSlice";
import {
  Badge,
  Button,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import useFetchDel from "../../Hooks/useFetchDelete";

const Home = () => {
  const [activeListItem, setActiveListItem] = useState("Inbox");
  const [iscompose, setCompose] = useState(false);
  const [readmoode, setReadMode] = useState(false);
  const [readmoodeValue, setReadModeValue] = useState("");
  const currentDate = new Date();
  const sentMails = useSelector((state) => state.mail.sentMails);
  const allMails = useSelector((state) => state.mail.allMails);
  const unread = useSelector((state) => state.mail.unreadMails);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    setTemp(allMails);
  }, [allMails]);

  const composehandle = (value) => {
    setCompose(value);
  };
  const dispatch = useDispatch();
  // Function to format the time (hh:mm AM/PM)
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  // Function to format the date (yyyy-mm-dd)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Get the formatted time and date
  const formattedTime = formatTime(currentDate);
  const formattedDate = formatDate(currentDate);

  const handleItemClick = (item) => {
    setActiveListItem(item);
    setReadMode(false);
    switch (item) {
      case "Inbox":
        setTemp(allMails);
        break;
      case "Sent":
        setTemp(sentMails);
        break;
      default:
        setTemp([]);
    }
  };

  //  reading window handler
  const readmodeHandler = () => {
    setReadMode(false);
  };

  const readModeActivehandler = (value) => {
    setReadMode(true);
    setReadModeValue(value);
    let temp = { ...value, read: true, unread: false };
    if (value.sender !== localStorage.getItem("email")) {
      fetch(
        `https://mail-box-client-89196-default-rtdb.firebaseio.com/mailClient/${value.mailId}.json`,
        {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(temp),
        }
      )
        .then((response) => {
          if (!response) {
            throw new Error("Unable to update the data");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          alert(error.message);
          console.log(error);
        });
    }
  };
  const deleteHandler = (value) => {
    fetch(
      `https://mail-box-client-89196-default-rtdb.firebaseio.com/mailClient/${value.mailId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Network error");
        } else {
          if (activeListItem === "Inbox") {
            dispatch(mailAction.allMail(value));
          } else {
            dispatch(mailAction.sentMail(value));
          }
          console.log("Deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // useFetchDel(
    //   `https://react-http-91704-default-rtdb.firebaseio.com/mailClient/${value.mailId}.json`
    // );

    setReadMode(false);
  };
  return (
    <section>
      <div className="container-fluid mail-main" style={{ height: "500px" }}>
        <div className="row" style={{ height: "90%" }}>
          <Card
            className="menu-disp menu col-lg-2 col-md-12 p-3 rad"
            style={{ height: "50%" }}
          >
            <button
              className="compose font-weight text-light"
              onClick={() => {
                composehandle(true);
              }}
            >
              <BiPencil size="1.5rem" /> Compose mail
            </button>
            <div className="inbox-list">
              <ListGroup className="menu-list font-weight mt-4">
                <ListGroupItem
                  style={{ cursor: "pointer" }}
                  className={activeListItem === "Inbox" ? "active" : ""}
                  onClick={() => handleItemClick("Inbox")}
                >
                  Inbox{" "}
                  <Badge pill bg="warning">
                    {allMails.length}
                  </Badge>
                  <br />
                  {/* <span className="inbox-mail-count">{allMails.length}</span> */}
                  {unread.length > 0 && (
                    <Badge pill bg="success">
                      {unread.length} unread mails
                    </Badge>
                  )}
                  {/* {unread.length>0 && <span className="inbox-unread-count">{unread.length} unread mails</span>} */}
                </ListGroupItem>
                <ListGroupItem
                  style={{ cursor: "pointer" }}
                  className={activeListItem === "Sent" ? "active" : ""}
                  onClick={() => handleItemClick("Sent")}
                >
                  Sent{" "}
                  <Badge pill bg="warning">
                    {sentMails.length}
                  </Badge>
                  {/* <span className="sent-mail-count">{sentMails.length}</span> */}
                </ListGroupItem>
              </ListGroup>
            </div>
          </Card>
          {!readmoode && (
            <Card
              className="bg-light list col-lg-9 py-3 px-4 mx-4 col-md-12 rad"
              style={{ height: "99%", overflow: "auto" }}
            >
              {/* Mail Listes   the main mail */}
              <CardBody className="mail-lists">
                {temp.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <h3> No {activeListItem} mail available</h3>
                  </div>
                ) : (
                  <ListGroup>
                    {temp.map((value, i) => (
                      <ListGroupItem
                        action
                        className="font-weight d-flex align-items-center justify-content-between font-reducer"
                        onClick={() => {
                          readModeActivehandler(value);
                        }}
                        key={value.mailId}
                      >
                        <span>{i + 1}</span>
                        {activeListItem === "Inbox" ? (
                          <TiArrowForward />
                        ) : (
                          <TiArrowBack />
                        )}
                        {!value.read && (
                          <span className="bullet">
                            <GoDotFill color="green" />
                          </span>
                        )}
                        {activeListItem === "Sent" ? (
                          <span>{value.reciver}</span>
                        ) : (
                          <span>{value.name}</span>
                        )}
                        <span className="title-mail-list">{value.subject}</span>
                        <span className="description-mail-list">
                          {value.mail}
                        </span>
                        <span className="mail-time">
                          <span>{value.time}</span>
                        </span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </CardBody>
            </Card>
          )}
          {readmoode && (
            <Card className="bg-dark list col-lg-9 col-md-11 mx-4 py-3 px-3" style={{color:'white',height:'530px',overflow:'hidden'}}>
              <div>
                <div className="mail-readmode-header">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={readmodeHandler}
                    title="Back"
                  >
                    <FcUpLeft size="1.3rem" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mx-3"
                    onClick={() => {
                      deleteHandler(readmoodeValue);
                    }}
                    title="Delete"
                  >
                    <AiFillDelete size="1.3rem" />
                  </Button>
                </div>
              </div>
              {/* Mail Listes   the main mail */}
              <div className="mail-readMod-container">
                <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom">
                  <div className="mail-readmode-header">
                    <span title="Subject of mail">
                      Subject: {readmoodeValue.subject}
                    </span>
                  </div>
                </div>
                <div className="mail-list-header p-3 font-weight d-flex flex-row justify-content-start">
                  <span className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      {activeListItem === "Sent" ? (
                        <span>me to</span>
                      ) : (
                        <span className="ms-2">{readmoodeValue.name}</span>
                      )}
                      <span> {readmoodeValue.time} </span>
                    </div>
                    {activeListItem === "Sent" ? (
                      <span>{readmoodeValue.reciver}</span>
                    ) : (
                      <span className=" ms-2">to me</span>
                    )}
                  </span>
                </div>
                <div className="message-container">{readmoodeValue.mail}</div>
              </div>
            </Card>
          )}
        </div>
      </div>
      {iscompose && (
        <ComposeMail
          onClick={composehandle}
          composeHandler={setCompose}
          time={formattedDate + " " + formattedTime}
        />
      )}
    </section>
  );
};

export default Home;
