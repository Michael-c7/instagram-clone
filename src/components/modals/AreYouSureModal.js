import React from 'react'
import styled from "styled-components"
import { usePostContext } from "../../context/post_context"


/*
What the data that is passed into the
AreYourSureModal component should look like
/*
const AreYouSureModalData = {
    headingMessage:"",
    bodyMessage:"",
    buttons:[
      {
        text:"Unfollow",
        function:unFollowUser,
        functionArguments:[],
        giveBoldStyle:true,
      },
      {
        text:"Go to post",
        function:goToPost,
        functionArguments:[],
        giveBoldStyle:false,
      }
    ]
  }

*/



const AreYouSureModal = ({AreYouSureModalData}) => {
    const {
        openAreYouSureModal,
        closeAreYouSureModal,
        isAreYouSureModalOpen,
    } = usePostContext()    
    const {headingMessage, bodyMessage} = AreYouSureModalData;

  return (
    <Wrapper>
        <div className={isAreYouSureModalOpen ? "modal-container modal-container--open" : "modal-container"}>
            <div className={headingMessage || bodyMessage ? "modal modal-padding-top" : "modal"}>
                {headingMessage || bodyMessage ? (
                    <header className="modal__header">
                        {headingMessage ? <h2 className="modal__header__heading">{headingMessage}</h2> : ""}
                        {bodyMessage ? <p className="modal__header__msg">{bodyMessage}</p> : ""}
                    </header>
                ) : ""}
                
                <div className="modal__buttons">
                    {AreYouSureModalData.buttons?.map((button, index) => {
                        if(!headingMessage 
                            && !bodyMessage 
                            && index === 0) {
                            return (
                                <button className={button.giveBoldStyle ? "modal__button--no-top-border modal__buttons__bold" : "modal__button--no-top-border modal__buttons__normal"} onClick={() => button?.function(...button?.functionArguments)} key={index}>{button.text}</button>
                            ) 
                        }
                            return (
                            <button className={button.giveBoldStyle ? "modal__button modal__buttons__bold" : "modal__button modal__buttons__normal"} onClick={() => button?.function(...button?.functionArguments)} key={index}>{button.text}</button>
                            )
                    })}
                    {/*Should always include a cancel / close the modal button as default*/}
                    <button className="modal__button modal__buttons__normal" onClick={() => closeAreYouSureModal()}>Cancel</button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default AreYouSureModal



const Wrapper = styled.section`
    .modal-container {
        position:absolute;
        top:0;
        left:0;
        background:rgba(50,50,50,0.5);
        width:100vw;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;

        z-index:-999;
        visibility:hidden;
        display:none;
    }


    .modal-container--open {
        visibility: visible;
        z-index:999;
        display:flex;
    }


    .modal {
        background:#fff;
        position:absolute;
        border-radius:10px;
        padding:0rem 0 0rem 0;
        width:24rem;
    }

    .modal-padding-top {
        padding:1.25rem 0 0rem 0;
    }


    .modal__header {
        // margin-bottom:1rem;
    }

    .modal__header__heading {
        font-size:1.25rem;
        font-weight:500;
        margin-bottom:0.25rem;
    }

    .modal__header__msg {
        font-size:0.9rem;
        color:gray;
        margin-bottom:1.5rem;
    }


    .modal__buttons {
        display:flex;
        flex-direction:column;
        cursor:pointer;
    }

    .modal__button {
        background:none;
        border:none;
        border-top:1px solid #dbdbdb;
        font-size:0.9rem;
        padding:1rem 0;
        cursor:pointer;
    }

    .modal__button--no-top-border {
        background:none;
        border:none;
        font-size:0.9rem;
        padding:1rem 0;
        cursor:pointer;
    }

    .modal__buttons__bold {
        color:var(--red);
        font-weight:bold;
    }








    @media screen and (max-width:500px) {
        .modal {
            width:95%;
        }
    }
`