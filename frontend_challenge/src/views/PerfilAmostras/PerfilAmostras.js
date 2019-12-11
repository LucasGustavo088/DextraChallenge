import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Visibility from "@material-ui/icons/Visibility";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import axios from 'axios';
import api from "services/api";
import { getToken } from "services/auth";

export default class PerfilAmostras extends React.Component {
  
  constructor(props) {
    super(props);
    this.getPerfilAmostrasAjax();

    this.state = {
      tableData: []
    }
  };

  getPerfilAmostrasAjax = () => {
    let url = api.baseUrl + "amostra/perfilAmostra";
    axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization" : getToken()
      } 
    }).then(res => {
      console.log('res', res);
      let newTableData = [];
      if(typeof res.data.data.perfis !== 'undefined') {
        res.data.data.perfis.forEach((item, index) => {
          let itemTable = [item.dataInicioColeta, item.dataTerminoColeta, item.tempoExposicao, item.status, <Link to={`/admin/perfil-amostras/visualizar-perfil-amostra/${item.id}`}><Visibility style={{color: "#00bae0"}} /></Link>];
          newTableData.push(itemTable);
          console.log(item);
        });
        this.setState({tableData: newTableData});
      }
    });
  }

  render() {
    const styles = {
      cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
          color: "rgba(255,255,255,.62)",
          margin: "0",
          fontSize: "14px",
          marginTop: "0",
          marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
          color: "#FFFFFF"
        }
      },
      cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
          color: "#777",
          fontSize: "65%",
          fontWeight: "400",
          lineHeight: "1"
        }
      }
    };
    
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 style={styles.cardTitleWhite}>Perfil das amostras</h4>
              <p style={styles.cardCategoryWhite}>
                <Link to="/admin/perfil-amostras/create-perfil-amostras">
                  <Button style={{color: "white"}}>Adicionar perfil de amostra</Button>
                </Link>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Data de inicio", "Data de término", "Tempo de exposição", "Status", "Ações"]}
                tableData={this.state.tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
