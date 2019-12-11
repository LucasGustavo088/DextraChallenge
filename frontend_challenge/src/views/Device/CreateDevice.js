import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import axios from 'axios';
import api from "services/api";
import {getToken} from "services/auth";
import Utils from "utils/utils";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CustomSelect from "components/CustomSelect/CustomSelect";

export default class CreateDevice extends React.Component {
    
    createAjax() {
      let pin = parseInt(document.getElementById("pin").value);
      let nome = document.getElementById("nome").value;
      let descricao = document.getElementById("descricao").value;
      let publico = document.getElementById("publico").value;
      let cep_posicao_atual = document.getElementById("cep_posicao_atual").value;
      let url = api.baseUrl + "equipamento";
      
      /* Validação */
      if(publico != "sim" && publico != "nao") {
        Utils.alertAirtech("Informe o campo público sim ou nao", "error");
        return false;
      } else {
        if(publico == "sim") {
          publico = 1;
        }  else {
          publico = 0;
        }
      }
      
      let device = {
        pin: pin,
        nome: nome,
        descricao: descricao,
        publico: publico,
        cep_posicao_atual: cep_posicao_atual,
      };

      let token = getToken();

      if(token == "") {
        Utils.alertAirtech("Houve um erro ao obter o token");
      } else {
        axios({
          method: 'post',
          url: url,
          headers: {
            "Authorization" : token
          }, 
          data: device
        }).then(res => {
          if(res.data.success) {
            Utils.alertAirtech("Equipamento adicionado com sucesso.", "success");
          } else {
            Utils.alertAirtech("Não foi possível adicionar", "error");
          }
        });
      }
    }

    render() {
        
        let styles = {
          cardCategoryWhite: {
              color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
            },
            cardTitleWhite: {
                color: "#FFFFFF",
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none"
            }
        };

        return (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 style={{
                color: "#FFFFFF",
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none"
            }}>Adicionar</h4>
                      <p style={{
              color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
            }}>Adicionar aparelho</p>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="PIN do aparelho"
                            id="pin"
                            inputProps={{
                              type: "number"
                            }}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Nome do aparelho"
                            id="nome"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Descrição"
                            id="descricao"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomSelect
                            labelText="Público"
                            id="publico"
                            formControlProps={{
                            fullWidth: true
                            }}
                            selectProps={{
                                menuItens: [
                                  {id: 'sim', text: 'sim'}, 
                                  {id: 'nao', text: 'nao'}
                                ],
                                type: "text"
                            }}>
                              <MenuItem value="sim">
                                Sim
                              </MenuItem>
                              <MenuItem value="nao">
                                Não
                              </MenuItem>
                           </CustomSelect>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="CEP da Posição atual"
                            id="cep_posicao_atual"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />                            
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button color="primary" onClick={this.createAjax}>Adicionar</Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
    }
}
