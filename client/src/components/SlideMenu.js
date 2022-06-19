import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import ViewIcon from "@mui/icons-material/Visibility";
import MoreIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/BookmarkAdd";

import MenuTextfield from "./MenuTextfield";
import Message from "./Message";

import { updateCharacter, deleteCharacter } from "../actions";
import { AuthContext } from "../contexts/Auth";
import { PresetContext } from "../contexts/Presets";
import PresetService from "../services/Presets";

export default function SlideMenu(props) {
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
  const [presetMenuAnchor, setPresetMenuAnchor] = useState(null);
  const [isOverwritingPreset, setIsOverwritingPreset] = useState(null);
  const [message, setMessage] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const { characterPresets, setCharacterPresets } = useContext(PresetContext);
  const character = useSelector(
    (state) =>
      state.characters.characterList[
        state.characters.characterList.findIndex((c) => c.id === props.id)
      ]
  );
  const dispatch = useDispatch();

  const presetMenuSubmit = (presetName) => {
    if (presetName === undefined || presetName === null || presetName === "") {
      presetName = "Unnamed Character";
    }
    PresetService.addCharacterPreset(presetName, character)
      .then((data) => {
        if (!data.message.msgError) {
          presetMenuClose();
          setMessage({ msgBody: "Saved " + presetName, msgError: false });
          setCharacterPresets(data.characterPresets);
          dispatch(updateCharacter(props.id, { lastSavedAs: presetName }));
        } else {
          setMessage({ msgBody: "An error occurred", msgError: true });
        }
      })
      .catch((data) => {
        setMessage({ msgBody: "An error occurred", msgError: true });
      });
  };

  const presetMenuOpen = (event) => {
    onPresetMenuChange(character.lastSavedAs || character.name || "");
    setPresetMenuAnchor(event.currentTarget);
  };

  const presetMenuClose = () => {
    setPresetMenuAnchor(null);
    setIsOverwritingPreset(null);
  };

  const onDelete = () => {
    dispatch(deleteCharacter(character.id));
  };

  const onPresetMenuChange = (presetName) => {
    if (presetName === undefined || presetName === null || presetName === "") {
      presetName = "Unnamed Character";
    }
    let isOverwriting = false;
    characterPresets.forEach((p) => {
      if (presetName === p.name) {
        return (isOverwriting = true);
      }
    });
    setIsOverwritingPreset(isOverwriting);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="flex-end" spacing={1}>
        <IconButton
          size={props.size}
          {...props.provided.dragHandleProps}
          onClick={() => {
            setIsSlideMenuOpen((prev) => !prev);
          }}
        >
          <MoreIcon fontSize={props.size} />
        </IconButton>

        <Slide direction="left" in={isSlideMenuOpen} mountOnEnter unmountOnExit>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <IconButton size={props.size} onClick={props.onToggleExpand}>
              <ViewIcon fontSize={props.size} />
            </IconButton>

            {isAuthenticated && (
              <IconButton onClick={presetMenuOpen} size={props.size}>
                <SaveIcon fontSize={props.size} />
              </IconButton>
            )}

            <IconButton onClick={onDelete} size={props.size} color="error">
              <DeleteIcon fontSize={props.size} />
            </IconButton>
          </Stack>
        </Slide>
      </Stack>

      <MenuTextfield
        anchor={presetMenuAnchor}
        onClose={presetMenuClose}
        onSubmit={presetMenuSubmit}
        onChange={onPresetMenuChange}
        defaultValue={character.lastSavedAs || character.name || ""}
        placeholder="Preset Name"
        closeText="Cancel"
        submitColor={isOverwritingPreset ? "info" : "success"}
        submitText={isOverwritingPreset ? "Overwrite" : "Save"}
      />
      {message ? (
        <Message
          msgBody={message.msgBody}
          msgError={message.msgError}
          onClose={() => setMessage(null)}
        />
      ) : null}
    </Box>
  );
}
