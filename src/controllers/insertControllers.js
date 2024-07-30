var puppeteer = require('puppeteer');

class InsertControllers {
    async insert(req, res) {
        const URL = req.body.url;
        const valueStart = req.body.start;
        const valueEnd = req.body.end;
        const browser = await puppeteer.launch({ headless: false, timeout: 60000 });
        const page = await browser.newPage();
        await page.goto(URL);
        await page.setViewport({ width: 1600, height: 1080 });
        
        const searchResultSelector = '.auth-login-form';
        await page.waitForSelector(searchResultSelector);
        await page.type("input[name=password]", "Alone531!", { delay: 100 });
        await page.click("button[type=submit]");
        
        await page.waitForNavigation();
        await page.waitForSelector('.scrollbar-container.main-menu-content.ps');
        await page.click('a[href="/share"]');
        
        for( let i = 1; i <= valueEnd; i++ ) {
            try {
                await page.waitForSelector('button.waves-effect.btn-icon.btn.btn-success.ml-2');
                await page.click('button.waves-effect.btn-icon.btn.btn-success.ml-2', { delay: 1000 });
    
                await page.waitForSelector('div.modal.modal-primary.fade.show');
                await page.click('div.modal.modal-primary.fade.show');
    
                await page.select('select[name="source"]', i.toString()); 
                await page.waitForSelector('input#autoBindPort');
                await page.click('input#autoBindPort');
    
                await page.type('input[name=destinationPort]', '');
                await page.type('input[name=destinationPort]', (parseInt(valueStart) + i).toString(), { delay: 100 });
    
                await new Promise(resolve => setTimeout(resolve, 1500));
                await page.waitForSelector('button[type="submit"]');
                await page.click('button[type="submit"]');
                await new Promise(resolve => setTimeout(resolve, 2500));
            } catch (error) {
                console.log(error);
                break;
            }
        }
        await browser.close();
        res.status(200).json({ success : true });
    }

    async delete(req, res) {
        const URL = req.body.url;
        const browser = await puppeteer.launch({ headless: false,});
        const page = await browser.newPage();
        await page.goto(URL);
        await page.setViewport({ width: 1600, height: 1080 });
        
        const searchResultSelector = '.auth-login-form';
        await page.waitForSelector(searchResultSelector);
        await page.type("input[name=password]", "Alone531!", { delay: 100 });
        await page.click("button[type=submit]");
        
        await page.waitForNavigation();
        await page.waitForSelector('.scrollbar-container.main-menu-content.ps');
        await page.click('a[href="/share"]');

        // Wait for the table to load
        await page.waitForSelector('.table-default');

        // Find all delete buttons within the table
        const btnDeleteHandles = await page.$$(
            '.table-default button.waves-effect.btn-icon.btn-sm.reset.btn.btn-danger'
        );

        for (let i = 0; i < btnDeleteHandles.length; i++) {
            try {
                await btnDeleteHandles[i].click();
                // Add any necessary wait time or confirmation clicks here if needed
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                console.log(`Error clicking delete button at index ${i}:`, error);
            }
        }
       
        await browser.close();
        res.status(200).json({ success : true });
    }

    async setupBrowser(){
        
    }
}
module.exports = InsertControllers;