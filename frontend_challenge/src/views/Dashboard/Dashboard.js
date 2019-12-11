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


class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.getDeviceAjax();
    this.getLocalizacaoAjax();
    this.state = {
      qtdAparelhos: 0,
      qtdPerfisAmostra: 2,
      qtdLocalizacoes: 0
    }
  };
  
  getDeviceAjax = () => {
    let url = api.baseUrl + "equipamento";
    axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization" : getToken()
      } 
    }).then(res => {
      console.log('res', res);
      if(typeof res.data.data.equipamentosCadastrados != "undefined") {
        this.setState({
          qtdAparelhos: res.data.data.equipamentosCadastrados.length
        });
      }
    });
  }

  getLocalizacaoAjax = () => {
    let url = api.baseUrl + "localizacao";
    axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization" : getToken()
      } 
    }).then(res => {
      console.log('res', res);
      if(typeof res.data.data.localizacoesDisponiveis != "undefined") {
        this.setState({qtdLocalizacoes: res.data.data.localizacoesDisponiveis.length});
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h1>Selecione o Lanche</h1>
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
