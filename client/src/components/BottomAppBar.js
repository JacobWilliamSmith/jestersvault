import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { startEncounter, endEncounter, nextTurn, previousTurn } from "../actions";
import { useSelector, useDispatch } from "react-redux";

export default function TurnCounterMenu() {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.characters);
  const inEncounter = useSelector(state => (state.turns.activeCharacterId !== null));
  
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
        <ImageSrc style={{ opacity:1, backgroundImage: `url(${props.imageUrl})` }} />
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
              <CustomButton title="Previous Turn" width="30%" imageUrl="https://sweeticeandfiresunray.files.wordpress.com/2019/05/ice_magic_by_mari_kyomo.jpg" onClick={() => {(dispatch(previousTurn(characters)))}} />
              <CustomButton title="End Encounter" width="40%" imageUrl="https://www.themebeta.com/media/cache/728/files/chrome/images/sites/default/files/theme/screenshot/ntp_background_37.png" onClick={() => {(dispatch(endEncounter()))}} />
              <CustomButton title="Next Turn" width="30%" imageUrl="https://blackcitadelrpg.com/wp-content/uploads/2022/01/Wall-of-Fire-5e.jpg" onClick={() => {(dispatch(nextTurn(characters)))}} />
            </Box>
          : <Box>
              <CustomButton title="Start Encounter" width="100%" imageUrl="https://media.istockphoto.com/photos/dark-background-with-defocused-lights-and-dust-particles-picture-id1335968532?b=1&k=20&m=1335968532&s=170667a&w=0&h=zwPhQyB0eCtH0gDe_qGUEw_BnudYHpxSje4iR1UuzWE=" onClick={() => {(dispatch(startEncounter(characters)))}} />
            </Box>
          }
      </AppBar>
    </Box>
  )
}