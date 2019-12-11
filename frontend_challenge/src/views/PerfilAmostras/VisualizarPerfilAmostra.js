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
import Utils from "utils/utils";

export default class VisualizarPerfilAmostra extends React.Component {

  constructor(props) {
    super(props);
    this.getPerfilAmostrasAjax();

    this.state = {
      tableData: [],
      tableDataEquipamento: []
    }
  };

  getPerfilAmostrasAjax = () => {
    var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
    var pathArray = window.location.pathname.split('/');

    if (pathArray.length < 5) {
      Utils.alertAirtech("Houve um erro ao obter os parametros", "error");
      return false;
    }

    let url = api.baseUrl + "amostra/perfilAmostra/" + pathArray[4];
    axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization": getToken()
      }
    }).then(res => {

      if (typeof res.data.data.perfilAmostra != 'undefined') {
        this.setState({ perfilAmostra: res.data.data.perfilAmostra });

        let perfilAmostra = this.state.perfilAmostra;
        let tableData = [];
        tableData = [
          ['Data de inicio', perfilAmostra.dataInicioColeta],
          ['Data de término', perfilAmostra.dataTerminoColeta],
          ['Tempo de exposição', perfilAmostra.tempoExposicao],
          ['Status', perfilAmostra.status],
          ['Sensores', perfilAmostra.sensores.map((item) => ' ' + item.nome + ',')],
        ];
        
        this.setState({
          tableData: tableData
        });

        let tableDataEquipamento = [];

        perfilAmostra.equipamentos.forEach((item) => {
          tableDataEquipamento.push([item.nome, <Link to={`/admin/perfil-amostras/visualizar-amostras-equipamento/${pathArray[4]}/${item.id}`}><Visibility style={{color: "#00bae0"}} /></Link>]);
        });

        this.setState({
          tableDataEquipamento: tableDataEquipamento
        });
      } else {
        Utils.alertAirtech("Houve um erro ao obter o cadastro", "error");
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
                  <Button style={{ color: "white" }}>Visualizar perfil de amostra</Button>
                </Link>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Item", "Valor"]}
                tableData={this.state.tableData}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
              <h5 style={styles.cardTitleWhite}>Equipamentos</h5>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Equipamento", "Ação"]}
                tableData={this.state.tableDataEquipamento}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
