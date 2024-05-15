<?php
/*
Plugin Name: CI 401k calculator
Plugin URI: https://www.calculator.io/401k-calculator/
Description: Free 401k retirement calculator that uses the 401k Growth Formula can help users plan for retirement and calculate 401k growth.  
Version: 1.0.0
Author: 401K Calculator / www.calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_401k_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for 401K Calculator by www.calculator.io";

function display_calcio_ci_401k_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">401K Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_401k_calculator_iframe"></iframe></div>';
}


add_shortcode( 'ci_401k_calculator', 'display_calcio_ci_401k_calculator' );