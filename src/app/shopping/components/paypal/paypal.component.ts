import { Component, AfterViewChecked } from '@angular/core';

declare let paypal: any;

@Component({
    selector: 'app-paypal',
    templateUrl: './paypal.component.html',
    styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {
    public didPaypalScriptLoad = false;
    private paymentAmount = 1; // just gather user data, don't require payment

    public paypalConfig: any = {
        env: 'sandbox',
        client: {
            sandbox: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
            production: 'AatO7Tmft1sqYwgfUzWixRFJONL7-IAqmOIFGZTIrMlvF2ey1MejKMhEhg2CcqlpNcTtzXNAx65r1kR1'
        },
        commit: true,
        payment: (data, actions) => {
            // return actions.
            return actions.payment.create({
                payment: {
                    transactions: [
                        { amount: { total: this.paymentAmount, currency: 'USD' } }
                    ]
                }
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then((payment) => {
                // show success page
                console.log('data: ' + data);
                console.log('payment: ' + payment);
            });
        }
    };

    public ngAfterViewChecked(): void {
        if (!this.didPaypalScriptLoad) {
            this.loadPaypalScript().then(() => {
                paypal.Button.render(this.paypalConfig, '#paypal-button');
            });
        }
    }

    public loadPaypalScript(): Promise<any> {
        this.didPaypalScriptLoad = true;
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }
}
