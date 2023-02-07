// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useCallback,useState } from "react";
import { useNavigate ,useLocation  } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
// components
import { Button} from 'react-bootstrap';
import "./Portfolio.css";


const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: theme.customShadows,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));

function Portfolioviewer() {

    const { state } = useLocation();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}, []));
    let navigate = useNavigate();
    const mdUp = useResponsive('up', 'md');

    var filename = "";
    const onClick = (event) => {
		const id = event.target.id;
		switch(id){
            case 'download':

                navigate('/portfolioview');  
                if ( window.location == 'http://http://210.109.61.179:3000/api/portfolioview' ) {
                     window.location.href='http://210.109.62.6:8080/api/user/attached/'+userDto.portsave;
                }
                
                navigate('/portfolioview');


                forceUpdate();
				break
        }
    
    }
    

    return (
        <>
            <div className="my-5 flex mx-auto max-w-7xl sm:px-6">
                {mdUp && (
                    <StyledSection>
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            <img className="profile" src={state.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        
                        <Typography variant="h6" gutterBottom>
                            {state.name} 님의 포트폴리오🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={state.email} inputProps={{ readOnly: true }}/>
                            <TextField label="성별" defaultValue={state.gender} inputProps={{ readOnly: true }}/>
                            <TextField label="연령대" defaultValue={state.age} inputProps={{ readOnly: true }}/>
                            <TextField label="학교" defaultValue={state.school}  inputProps={{ readOnly: true }}> </TextField> 
                            <TextField label="기술 스택" defaultValue={state.tech} style={{marginBottm:20}} inputProps={{ readOnly: true }}></TextField>
                        </Stack>
                    <Typography variant="h6" gutterBottom style={{ marginTop: 50}}>
                            포트폴리오 파일
                        </Typography>
                    {state.portname !== "" &&<Button id="download" onClick= {onClick} variant="h9" style={{ marginTop: 10}}>
                        {state.portname}
                    </Button>}

                    <a thhref="|/attached/${filename}|" thtext="dddd"/>
                    {state.portname === ""&&<Typography variant="h9" style={{ marginTop: 50}}>
                        {filename}
                    
                    </Typography>}
                    </StyledContent>
					
                    
                </Container>
            </div>
            
         
        

           
        </>
    );
}

export { Portfolioviewer };

