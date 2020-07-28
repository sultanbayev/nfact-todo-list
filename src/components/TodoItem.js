import React from "react";
import styled from "styled-components";

const DeleteSpan = styled.span`
    cursor: pointer;
`;

const Checkbox = styled.input``;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    ${props => props.isChecked ? 'text-decoration: line-through' : null};
    ${props => props.isEditable ? 'text-decoration: none; border: 1px solid #000000' : null};
    user-select: none;

`;

const MainContainer = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 10px;
    padding: 10px;
    background-color: ${props => props.isChecked ? '#c8e6c9' : '#f9fbe7'};
`;

function TodoItem({ title, id, index, onDelete, isChecked, onCheck, updateTitle }) {

    const [isEditable, setEditable] = React.useState(false);

    const onDeleteClick = () => {
        onDelete(id);
    };

    const onCheckboxChange = (event) => {
        onCheck(id, event.target.checked)
    };

    return (
        <MainContainer isChecked={isChecked}>
            <TitleWrapper>
                <Checkbox onChange={onCheckboxChange} type="checkbox" checked={isChecked}></Checkbox>
                <Title
                    isEditable={isEditable}
                    contentEditable={isEditable}
                    isChecked={isChecked}
                    onDoubleClick={() => {
                        setEditable(true)
                    }}
                    onBlur={(event) => {
                                setEditable(false)
                                updateTitle(id, event.target.innerText)
                            }
                        }
                    onKeyDown={(event) => {
                        if (isEditable && event.keyCode === 13) {
                            setEditable(false)
                            updateTitle(id, event.target.innerText)
                        }
                    }}
                    suppressContentEditableWarning={true}
                >{title}</Title>
            </TitleWrapper>
            <DeleteSpan onClick={onDeleteClick}> &times; </DeleteSpan>
        </MainContainer>
    );
}

export default TodoItem;