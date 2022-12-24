import { useNavigate } from "react-router-dom"
import { Header } from '../../components/Header'
import { Container, Column, Title, Wrapper, TitleStart, SubtitleStart, Form, Text, Row, SubText, LoginText} from "./styles";
import { IoMdPerson } from "react-icons/io";
import { MdEmail, MdLock } from "react-icons/md";
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";


const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

        const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/cadastro') 
                return
            }

        }catch(e){
        }
    };


   return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleStart>Começe agora grátis</TitleStart>
                    <SubtitleStart>Crie sua conta e make the change.</SubtitleStart>
                    <Form>
                        <form className = "Form" onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome" leftIcon={<IoMdPerson />} name="name"  control={control} color = "#8647AD"/>
                            {errors.name && <span>Nome completo</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                            {errors.email && <span>E-mail</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                            {errors.senha && <span>Password</span>}
                        </form> 
                        <Button title="Entrar" variant="secondary" type="submit"/>
                    </Form>
                    <Text>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</Text>
                    <Row>Já tenho conta. <span style={{ color: "#23DD7A" }} > Fazer login. </span> </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export {Cadastro}