import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Add from "@material-ui/icons/Add";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import api from "services/api";
import axios from "axios";
import { getToken } from "services/auth";
import Utils from "utils/utils";
import { Link, Button } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Fade from '@material-ui/core/Fade';

class Carrinho extends React.Component {

  constructor(props) {
    super(props);
    this.getProdutoAjax();

    this.state = {
      tableData: [],
      carrinho: [],
      valorTotalCarrinho: 0,
      produtos: [],
      modalCriarProdutoCustomizado: false,
      novoProdutoCustomizado: []
    }
  };

  getProdutoAjax = () => {
    let url = api.baseUrl + "produto/cardapio";
    axios({
      method: 'get',
      url: url
    }).then(res => {
      if (typeof res.data != 'undefined') {
        var produtos = res.data;

        if (produtos.length > 0) {
          this.setState({ produtos: produtos });
          var tableData = [];
          produtos.forEach((item, index) => {
            tableData.push([item.id, item.descricao, item.ingredientes.map((item, index) => (index > 0 ? ', ' + item.descricao : item.descricao)), Utils.formatarReal(item.precoTotal, true), <img style={{ borderRadius: "2px" }} height="100" weigth="auto" src={item.foto} />, <Button onClick={() => this.adicionarProdutoCarrinho(item.id)}><Add style={{ color: "#00bae0" }} /></Button>]);
          });

          this.setState({ tableData: tableData });
        }
      }
    });
  }

  adicionarProdutoCarrinho = (idProduto) => {
    var carrinho = this.state.carrinho;

    this.state.produtos.forEach((item) => {
      if (item.id == idProduto) {
        carrinho.push(item);
      }
    });

    this.recalcularValorCarrinho();
  }

  recalcularValorCarrinho = () => {
    var valorTotalCarrinho = 0;
    this.state.carrinho.forEach((item) => {
      valorTotalCarrinho += item.precoTotal;
    });

    this.setState({ valorTotalCarrinho: valorTotalCarrinho });
  }

  handleCloseModalCriarProdutoCustomizado = () => {
    this.setState({
      modalCriarProdutoCustomizado: false
    });
  }

  handleOpenModalCriarProdutoCustomizado = () => {
    this.setState({
      modalCriarProdutoCustomizado: true
    });
  }

  render() {
    const styles = {
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: "#fff",
        boxShadow: "60px -16px teal;",
        padding: "10px",
      },
    };

    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={styles.modal}
          open={this.state.modalCriarProdutoCustomizado}
          onClose={this.handleCloseModalCriarProdutoCustomizado}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalCriarProdutoCustomizado}>
            <div style={styles.paper}>
              <h2>Adicionar produto customizado</h2>

            </div>
          </Fade>
        </Modal>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 style={styles.cardTitleWhite}>Carrinho</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Descrição", "Ingredientes", "Preço total", "Foto", "Ações"]}
                  tableData={this.state.tableData}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} style={{ position: 'fixed', bottom: "50px", left: "0px", width: "250px", zIndex: "4" }}>
            <CardHeader color="primary">
              <strong><h3 style={styles.cardTitleWhite}>Valor total: {Utils.formatarReal(this.state.valorTotalCarrinho, true)}</h3></strong>
              <Link to="/admin/perfil-amostras/create-perfil-amostras">
                  <Button style={{color: "white"}}><ShoppingCart/> Ver produtos no carrinho</Button>
              </Link>
            </CardHeader>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

}

Carrinho.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carrinho);
