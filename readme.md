# 401K Calculator WordPress Widget by [Calculator.iO](https://www.calculator.io/ "Calculator.iO Homepage")

Free 401k retirement calculator that uses the formula FV = (PV + TC) + (1 + R)n can help users plan for retirement and calculate 401k growth.  

![401K Calculator Input Form](/assets/images/screenshot-1.png "401K Calculator Input Form")
![401K Calculator Calculation Results](/assets/images/screenshot-2.png "401K Calculator Calculation Results")

## Installation

1. [Download](https://github.com/pub-calculator-io/age-calculator/archive/refs/heads/master.zip) the ZIP file of this repository.
2. Upload the /401k-calculator-master/ folder to the /wp-content/plugins/ directory.
3. Activate the [401K Calculator](https://www.calculator.io/401k-calculator/ "401K Calculator Homepage") plugin through the "Plugins" menu in WordPress.

## Usage
* Add the shortcode `[ci_401k_calculator]` to your page or post and configure default mortgage parameters.
* If you are using widgets, just add the 401K Calculator to the sidebar through the `Appearance -> Widgets -> 401K Calculator` menu in WordPress.
* Add the following code: `<?php display_ci_401k_calculator(); ?>` to your template where you would like the 401K Calculator to appear.

## Libraries in Use
1. https://mathjs.org/
2. https://katex.org/
3. https://github.com/aFarkas/lazysizes
4. https://github.com/RobinHerbots/Inputmask
5. https://air-datepicker.com/
6. https://www.chartjs.org/