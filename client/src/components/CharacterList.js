import * as React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Character from "./Character";
import CharacterListHeader from "./CharacterListHeader";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { createCharacter, dragAndDropCharacter } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function CharacterList() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characterList);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    dispatch(dragAndDropCharacter(draggableId, source.index, destination.index));
  };

  function handleCreateCharacter() {
    const createCharacterPromise = () =>
      new Promise((resolve, reject) => {
        dispatch(createCharacter());
        resolve();
      });

    createCharacterPromise().then(() => {
      window.scroll({ top: document.body.offsetHeight, left: 0, behavior: "smooth" });
    });
  }

  return (
    <Box>
      <CharacterListHeader />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characterList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map((c) => (
                <Box key={c.id}>
                  <Draggable
                    draggableId={c.id}
                    index={characters.findIndex((el) => c.id === el.id)}
                  >
                    {(provided) => (
                      <div {...provided.draggableProps} ref={provided.innerRef}>
                        <Divider />
                        <Character id={c.id} provided={provided} />
                        <Divider />
                      </div>
                    )}
                  </Draggable>
                </Box>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Divider />
      <Box sx={{ mb: 9, mt: 0.5, ml: 1, mr: 1 }}>
        <Button
          fullWidth
          onClick={() => {
            handleCreateCharacter();
          }}
        >
          <Typography>ADD CHARACTER</Typography>
        </Button>
      </Box>
    </Box>
  );
}
