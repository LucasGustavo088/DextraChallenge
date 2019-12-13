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
import Remove from "@material-ui/icons/Remove";
import Refresh from "@material-ui/icons/Refresh";

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

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.getIngredientesAjax();
    this.getProdutoAjax();

    this.state = {
      tableDataProdutos: [],
      tableDataCarrinho: [],
      carrinho: [],
      valorTotalCarrinho: 0,
      produtos: [],
      modalCriarProduto: false,
      novoProduto: null,
      ingredientes: [],
      tableIngrediente: []
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
          var tableDataProdutos = [];
          produtos.forEach((item, index) => {
            tableDataProdutos.push([item.id, item.descricao, item.ingredientes.map((item, index) => (index > 0 ? ', ' + item.descricao : item.descricao)), Utils.formatarReal(item.precoTotal, true), <img style={{ borderRadius: "2px" }} height="100" weigth="auto" src={item.foto} />, <Button onClick={() => this.adicionarProdutoFinalizacaoCarrinho(item.id)}><Add style={{ color: "#00bae0" }} /></Button>]);
          });

          this.setState({ tableDataProdutos: tableDataProdutos });
        }
      }
    });
  }

  getIngredientesAjax = () => {
    let url = api.baseUrl + "produto/ingredientes";
    axios({
      method: 'get',
      url: url
    }).then(res => {
      if (typeof res.data != 'undefined') {
        var ingredientes = res.data;

        if (ingredientes.length > 0) {
          this.setState({ ingredientes: ingredientes });
        }
      }
    });
  }

  adicionarProdutoFinalizacaoCarrinho = (idProduto) => {
    let novoProdutoState = this.state.novoProduto;
    console.log(novoProdutoState);
    this.state.produtos.forEach((item) => {
      if (item.id == idProduto) {
        novoProdutoState = item;

        var novoIngredientesExistentes = [];
        novoProdutoState.ingredientesExistentes = this.state.ingredientes;
        novoProdutoState.ingredientesExistentes.forEach((itemIngredienteExistente) => {

          itemIngredienteExistente.quantidade = 0;
          novoProdutoState.ingredientes.forEach((itemIngrediente) => {
            if (itemIngredienteExistente.id == itemIngrediente.id) {
              itemIngredienteExistente.quantidade = itemIngrediente.quantidade;
            }
          });
          novoIngredientesExistentes.push(itemIngredienteExistente);
        });

        novoProdutoState.ingredientes = novoIngredientesExistentes;

        this.atualizarTableIngrediente(novoProdutoState);
        this.setState({novoProduto: novoProdutoState});
        this.atualizarNovoProdutoCarrinhoAJax(novoProdutoState);

      }
    });

    this.atualizarNovoProdutoCarrinhoAJax(novoProdutoState);
  }


  adicionarIngredienteNovoProduto = (idIngrediente) => {
    let novoProduto = this.state.novoProduto;

    novoProduto.ingredientes.filter((item) => {
      if (idIngrediente == item.id) {
        console.log(item.quantidade);
        return (++item.quantidade);
      }
    });


    this.setState({ novoProduto: novoProduto });
    this.atualizarNovoProdutoCarrinhoAJax(novoProduto);
  }

  refazerProduto = () => {
    this.setState({novoProduto: null});
  }

  removeIngredienteNovoProduto = (idIngrediente) => {
    let novoProduto = this.state.novoProduto;

    novoProduto.ingredientes.filter((item) => {
      if (idIngrediente == item.id) {

        if(item.quantidade != 0) {
          return (--item.quantidade);
        }
        return item.quantidade;
      }
    });


    this.setState({ novoProduto: novoProduto });
    this.atualizarNovoProdutoCarrinhoAJax(novoProduto);
  }

  atualizarTableIngrediente = (novoProduto) => {

    let tableIngrediente = [];
    novoProduto.ingredientes.forEach((item) => {
      tableIngrediente.push([item.descricao, item.quantidade,
      <React.Fragment>
        <Button onClick={() => this.adicionarIngredienteNovoProduto(item.id)}><Add style={{ color: "#00bae0" }} /></Button>
        <Button onClick={() => this.removeIngredienteNovoProduto(item.id)}><Remove style={{ color: "#00bae0" }} /></Button>
      </React.Fragment>
      
      ]);
    });
    this.setState({ tableIngrediente: tableIngrediente });
  }

  adicionarNovoProdutoCarrinho = () => {
    let todosIngredientesZerados = true;
    this.state.novoProduto.ingredientes.forEach((item => {
      if(item.quantidade > 0) {
        todosIngredientesZerados = false;
      }
    }));
    if(todosIngredientesZerados) {
      Utils.alertDextra("Para adicionar é necessário ter pelo menos um ingrediente", "warning");
      return false;
    }

    let carrinho = this.state.carrinho;
    carrinho.push(this.state.novoProduto);


    this.setState({carrinho: carrinho, novoProduto: null, modalCriarProduto: false});
    Utils.alertDextra("Produto adicionado com sucesso!", "success");
  }

  atualizarNovoProdutoCarrinhoAJax = (novoProduto) => {
    let descricao = novoProduto.descricao;
    if(novoProduto != null) {
      let url = api.baseUrl + "produto/obter_produto";
      axios({
        method: 'post',
        url: url,
        data: novoProduto.ingredientes,
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      }).then(res => {
        if (typeof res.data != 'undefined') {
          novoProduto = res.data;
          novoProduto.descricao = descricao;
          this.atualizarTableIngrediente(novoProduto);
          this.setState({novoProduto: novoProduto});
          this.getProdutoAjax();
        }
      });
    }
  }

  removerProdutoCarrinho = (idProduto) => {
    let carrinhoState = this.state.carrinho;
    
    let novoCarrinho = [];
    carrinhoState.forEach((item) => {
      if(item.id != idProduto) {
        novoCarrinho.push(item);
      }
    });
    this.setState({carrinho: novoCarrinho});
  }

  handleCloseModalCriarProduto = () => {
    this.setState({
      modalCriarProduto: false
    });
  }

  handleOpenModalCriarProduto = () => {
    this.setState({
      modalCriarProduto: true
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
    
    let tableDataCarrinho = [];
    this.state.carrinho.forEach((item) => {
      tableDataCarrinho.push([item.id, item.descricao, item.ingredientes.map((item, index) => (item.quantidade > 0 ? (index > 0 ? ', ' + item.descricao : item.descricao) : "")), Utils.formatarReal(item.precoTotal, true), <img style={{ borderRadius: "2px" }} height="100" weigth="auto" src={item.foto} />, <Button onClick={() => this.removerProdutoCarrinho(item.id)}><Remove style={{ color: "#00bae0" }} /></Button>]);
    });
    let valorTotalCarrinhoCalculado = 0;

    this.state.carrinho.forEach(item => valorTotalCarrinhoCalculado += item.precoTotal);
    
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={styles.modal}
          open={this.state.modalCriarProduto}
          onClose={this.handleCloseModalCriarProduto}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modalCriarProduto}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  {this.state.novoProduto == null ?
                    <React.Fragment>
                      <CardHeader color="primary">
                        <h4 style={styles.cardTitleWhite}>Adicionar produto</h4>
                      </CardHeader>
                      <CardBody>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["ID", "Descrição", "Ingredientes", "Preço total", "Foto", "Ações"]}
                          tableData={this.state.tableDataProdutos}
                        />
                      </CardBody>
                    </React.Fragment>
                    :
                    ""}

                  {this.state.novoProduto != null ?
                    <Card>
                      <CardHeader color="primary">
                        <h4 style={styles.cardTitleWhite}>Produto</h4>
                      </CardHeader>
                      <CardBody>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Ingrediente", "Quantidade", "Ações"]}
                          tableData={this.state.tableIngrediente}
                        />
                        <p>Valor total: {Utils.formatarReal(this.state.novoProduto.precoTotal, true)}</p>
                        <Button color="primary" onClick={this.refazerProduto}><Refresh /> Refazer produto </Button>
                        <Button color="primary" onClick={this.adicionarNovoProdutoCarrinho}><Add /> Adicionar produto no carrinho </Button>
                      </CardBody>
                    </Card>
                    :
                    ""
                  }
                </Card>
              </GridItem>
            </GridContainer>
          </Fade>
        </Modal>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 style={styles.cardTitleWhite}>PDV - Lanchonete Dextra</h4>
                <Button style={{ color: "white" }} onClick={this.handleOpenModalCriarProduto}>Adicionar produto</Button>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Descrição", "Ingredientes", "Preço total", "Foto", "Ações"]}
                  tableData={tableDataCarrinho}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} style={{ position: 'fixed', bottom: "50px", left: "0px", width: "250px", zIndex: "4" }}>
            <CardHeader color="primary">
              <strong><h3 style={styles.cardTitleWhite}>Valor total: {Utils.formatarReal(valorTotalCarrinhoCalculado, true)}</h3></strong>
              <Button style={{ color: "white" }}><ShoppingCart /> {this.state.carrinho.length} produto(s) no carrinho</Button>
            </CardHeader>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
