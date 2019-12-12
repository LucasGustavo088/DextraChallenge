import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import axios from 'axios';
import api from "services/api";
import { getToken } from "services/auth";

export default class Localizacao extends React.Component {
  
  constructor(props) {
    super(props);
    this.getProdutosAjax();

    this.state = {
      tableData: []
    }
  };

  getProdutosAjax = () => {
    let url = api.baseUrl + "produto/cardapio";
    axios({
      method: 'get',
      url: url
    }).then(res => {
      console.log('res', res);
      if(typeof res.data.data.localizacoesDisponiveis != "undefined") {
        let newTableData = [];
        res.data.data.localizacoesDisponiveis.forEach((localizacao, index) => {
          let itemTable = [localizacao.estado, localizacao.cidade, localizacao.bairro, localizacao.totalEquipamentos];
          newTableData.push(itemTable);
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
              <h4 style={styles.cardTitleWhite}>Produtos</h4>
              <p style={styles.cardCategoryWhite}>
                {/* <Link to="/admin/device/create-device">
                  <Button style={{color: "white"}}>Adicionar aparelho</Button>
                </Link> */}
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Descrição", "Ingredientes", "Preço total"]}
                tableData={this.state.tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
