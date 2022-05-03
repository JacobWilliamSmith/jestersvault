import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { startEncounter, endEncounter, nextTurn, previousTurn } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function TurnCounterMenu() {
  const dispatch = useDispatch();
  const inEncounter = useSelector(state => (state.characters.activeCharacterId !== null));
  
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 64,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 64,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  function CustomButton(props) {
    return (
      <ImageButton focusRipple style={{ width: props.width }} onClick={props.onClick} >
        <ImageSrc/>
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{ position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, }}
          >
            {props.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>
    )
  }

  return (
    <Box>
      <AppBar position="fixed" sx={{top: 'auto', bottom: 0, pt: 0.5}}>
          { inEncounter
          ? <Box>
              <CustomButton title="Previous Turn" width="30%" onClick={() => {(dispatch(previousTurn()))}} />
              <CustomButton title="End Encounter" width="40%" onClick={() => {(dispatch(endEncounter()))}} />
              <CustomButton title="Next Turn" width="30%" onClick={() => {(dispatch(nextTurn()))}} />
            </Box>
          : <Box>
              <CustomButton title="Start Encounter" width="100%" onClick={() => {(dispatch(startEncounter()))}} />
            </Box>
          }
      </AppBar>
    </Box>
  )
}