let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
(async () =>{
    let client = await DvaraGold.Client(config);
    return await client.getCustomerInvoiceUrl('pwamfi001','bb59efd0-a976-11ea-9d8b-8553c34f29f2')
})()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})