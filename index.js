const fs = require('fs');
const fetch = require('node-fetch');
const unzipper = require('unzipper');
const csvParser = require('csv-parser');

console.log('Download TERC...');
fetch("http://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pliki_pelne.aspx?contrast=default", {
    "credentials": "include", "headers": { "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7", "cache-control": "no-cache", "content-type": "application/x-www-form-urlencoded", "pragma": "no-cache", "upgrade-insecure-requests": "1" }, "referrer": "http://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pliki_pelne.aspx?contrast=default", "referrerPolicy": "no-referrer-when-downgrade",
    "body": "__EVENTTARGET=ctl00%24body%24BTERCAdresowyPobierz&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=sAdmGM%2FQvvLSyw00N6FBuOjloJVnD9negAFom1eofWmSEwAVBXBXSQU9ZS5smI%2BvP%2BwdxDI5wDpANz5Ny2LZpl16PWl49X5rp2VtLXQO49%2BoG6tCXxkSdPkqLC%2FTBZ7u1gYEvUzM%2BTNuyBzQqfWkYQbO2jzDJ7K9FEnDZhTutwWHzKpzKu%2FtWKBdiwqK7RuYb8eAbdj7O62jRuqjFDyq6ZsLkAjq2P2YvP8hVY43UuUjeZuCKU%2FUXXwEnPQoKu3qyJ1jKej44Z00eeS0nH90WeRuRXS0vxWI8W8GOCeCRqsLA2n9K63VulvxZI07swzA%2BLqzStwST6%2FMC8PgRCC3aoIAPFOxS54X3RDAeQ%2FSJYWMxga2n3Ne8XLuh0TsmYlubYR6hpdM3CJGO%2BrNyO%2FylaClQQcxWEWeJvSZWLTbr%2FvC5Wo9jgqyqjowqSDHOLAZHakmOCtA%2FWNJS3Wjfu%2FMp8%2FSp4ItrLYWcfL28rwqD3kQ2cWOnkMbFXQM4dyOMkjqrlnVer2Bcww83tyBut0AOyQP0Bpylt5MkpaBW%2B270vd2Yn8HkrDSsb2sVd1b9BY1%2B9e8gx%2B05zpehON16bU39KWrXmC%2B7Ug4GyZrKYGtNKfsHaO19mthYm8KjYY7r0QWdu2eujQBFYWqK9Z2y0F5Pfv2ABDqamC9Hwbb6WHoseBNa2rU%2BAbh8b76eHW1r%2B1paVJKisHZGODhBRcWqPT2nQUbJpgriPj%2F7Jghw2B47urM99Z0ttMt5b4ioHs9%2BU%2BQfhy%2Bq8tNlKu5RNqU47hWRoWefc4t0AH6k0F8nto5oAhB6gqxAbQi3Ty7r1HyJ1bVVaVTJp3llrnCskrxUZKipHIrwikgfHKBY4cqq3TFmS%2FVskvcpaeQatKFpHgtLBZ%2BuMjNztqyCe9LfC74CDfLciKDBHYz%2FQuL37T%2FGJ2GFb5VLfTgkKGmCzDMbatBKqjf4IYAo7sXH1LdreDBSmMPFn84ouVfhnsQmEGtcQfAanKFbbkV%2BnihAR%2BT37ZQIp5qEMe2Y8y6FVhmQiLe8DEKp%2FJjm8tm1dIy7Pls7afeJG0enslHHNQ5wjCMFGGvh9mSEINrJBzq35XrALQFDW%2FVpVbg74l85CAwjHTGsKOshpta%2Bj0TVCaXKX7X%2Fe5FUHuR9meRTY3GaBGFmZI8%2F5W5qzUNg0890Ion70MP7Y8UvadRuv%2BT5D9H63IxFazVd4RO4ut%2FFLrrNu3F0OWS6cspvCWEqI69ZVgArMkNodHUDJlHfoaKQuoUggpeZkSSmaY4bCRSyZaimpGDAjXv5QnWxuPztInSxRJklfGwzDnPQ7d3cd5N47FlZFjpf%2Bhxp%2BLqYP4UFgTbh7on5erm0Y61d3sFYyunnls%2Bc4fZEjpqq7Ipy%2FIBZsq1qhLwZuK%2FzkY2RDHqrf8WnEyk%2Flb7T8PMm1NCvj3FzM8vCUcLi4RCf2dXKpA03CQ0HHpRF6q%2FYqbLbMfRvEwyKpLJTcZy%2FtXDV2ChnZUQwa8kQKTI7pQFFtQXD4C4azns2U5Zx6Gs1L%2FySwwTx%2FjmaS0hNFzPucVl6yIYK1MrQe4PcbM2UcmDJeSTsocdlkb3IVI97RylTlwNog4Bxz%2FcBRN6IaFACOQtPIkiV01bb8Yy3WpSM0R2Rqi%2FxlCjsNGNJRylIurKZmOzM2w%2BHjcil1aqd26086cvgmRyN45rcSx9ST2EkZFvz77UGynkg3IY7h%2BRbDfXRo1mA8ywJRka0GT8GxAhSfkvaALvavAfHmjhBlPezE8ndqWDNEzkUKnSkrmSW2HlblKwKE1AeAy2St8H1KfWtiOCd%2BhhAlY%2B%2B5knrbZLHUqiaM0YnDvb3UG1oZKIabKneEdwkuaLCg9AzlQIY%2FUG%2Bmv6arcgh7v0s47My3IKWrO291jmEQnDUixQ8fB%2FXFq8oNUTe0UBCJJp6huR%2FohRzJfT5LcfS136rvTmSikuGvRtcxaH76mS5oTcnlaV5t5niGE22zXBsE6pLAEgJh7XQRdiK7%2BsN7ib9Z1WIKor7N9Qv7Gh8DhRXlrxaUnbrNZIFzNRjM6qmIwFo7%2FcPGA3ZYtWC6aYtBPE6pZs2YCAOdajDJF6WXcAAk48t3NfVR%2Flpa18EuvQkCn%2BFHcxqbawxpH0jpahmSiSXLKgUrs8C5LeUGgjv8sMrXaC%2BAMV9haykbhgT1UurxkvPLRYPlTr9j1Hczs522MQu3jiyHJYvK1qVn2YUzdNHkeM2tjUL6WbmMAoAiboAxjKVO2tVNGfrpqFSfrqgXGCRFS5q7a2MZNWqFQLC2ZJzvOXGTgEgYYPfjENGrgh4Vp9uxWOehpeBWl6jjuOwvlplRY0lAWUPzao2nAa89RAmYwnNnHrst%2FKOgm0evE5dvf%2FuAG2pba9Uf5U%2BSqk5FC0sfEMLwBRZE0uaHNetc6zPasHU7%2B4tvllbP%2FPV9XY37k9uRRN7RvNxi3BflwGOUNX1OrlMJvPR8j4CXCbh3ptCVX2ZeZQlk%2BtSZICwHtx9ebIgdELXT8leXxm7OzK4aLgV5u4aWbdWjx%2FB55tHR4gEuqOs5KaLVAkzsbsQJvjl2Y%2FGX128SiAeaehhK6vc6VCY4%2B5faQBwxhHvRFN%2FJkxdokG5Ur9U7D67xHxKo117kDB92E8onrCqv7SaeX4FBlCr5WYXRzrIMchuRPgUfI1xtMFZh8RcK2p%2FejhkuLMKLONr2IWeTClEAEAlAzco%2BJxT4lLay7y1qo5PMo86u%2F%2FeRxWl%2B2S5B1a15t%2FgRwhqjwzcER9HNDPYi%2FmrHXpdShh35A5YdnGLrUwu15fEi1Tcmt1qtPHnlLzsI5wlV9OT3z2HFtB6XaUGvL7KiMUsGpV%2FGmL3mBhulkOJAiP3X%2F%2FyORdwLNlOIKcyxN%2F6Q9N7S4qKLvEqQSoUGw7Z3pxEe%2B6MxJECMilAHXxSyAtZ7ErhCepx532u%2F%2BqdzkdYjoAoq2ugCs07jOyXxNGx%2Bi9BHT%2Fc0m0%2B2J8JA1rgIx3x7UBZOPtI%2Fok3fRIP8IvIoMxLVBdZ7tT0p%2BTOfCSQzo1SByI1jyERH1QVG6dTk01tCeQemha0NpcVZX3zdhuOuHee1rSsaPoIpxcvqcS8kh7ELkmIAIDDZbfJSoRgt6w735JALJLHW6S%2BwCL2GDjaWyNzaQeFPY5kV6fQ6MkuYpTOCiHOBgOx%2FKUflKsPn%2FfmExDP5r9V2tOxulKWa9ZooXIVvq47hrjug92sduVd3Y%2Bu0pQYcfJwXVHPEyn19S9AO9J9gRqQaEYrYfW%2BporSrHBN%2BJLk2iDhZXpw3%2BKYIkJl0U4Mwmc4%2FpGwkzodQoDwiF%2FD6t5ywxt%2FHFmDU18bTKderU739lsF4WzbNtUky7ju9hKfLBZrPJ0H0rwvcATv2vSrV06PjMt0OcNmxpmXRFqaLrksXdjpIr0N53wBeMEYUfyAhLjMfbzG%2F1cQxb2LGLHTn8LUWASqdWvVyREUYDsBZ7cd8IQ0YXmtub7AtCHKx8zIlkOHGtqjX4LlOhRKHHaWXZ9dYm5ntjyl7ChMNvBQzGkK8TdBXOhtdHJDdzVn1MGdEs779bamGeHsP4vWMs1ggu9YjqExUrLYc3%2B9P8795TjJ3UHZPqwPFaORItTyMEDyeHflkEYQTcnh4%2FSy%2BYo8zaSZr%2FE7NYAw0dcy8uODQSujXyGwLHfZTeEigK2BxO0a%2BhukMOwtJAovH32%2FebdXcFoQHxs%2B%2BlvJ9vjcoxeAKjFLW09RceHUSbIpX0kddaJ4wlR3NkfuHsWp27L5AdMecb2TkKr4jhoiiD%2Fd8b1B7matXSC42dBByDtUVi6gR3lwNyjG6U1Nk8zMPPKp3Q5lEQeKPkEavJSwfzktUeSvj8rQ5l97Rj12D4G4JyiITOQ%2Bo0y4t6%2FK6QMUZ5OPUbaAq8lPNcZ%2BmnOHJP09LRtoE3mNOBwEZL1D9pDy0dHEdZMtv3cZcpngo5jvn4Nhz6vJINsSPJeNB%2Fon0k9JNJNBM%2B4uowWrB6%2BJ%2BYAbtuauHoh8g87CM56AZhk0B5C3FLtsXnPFz4YnX4iacqs0BniCwIVvshyiLFnwQ0bJ1edxCvF1%2B7NaWGAhGTJZlOdHCtIFXDzG%2Bdus7xaKquHma25UPnjwITJAA3U0NwB1QFIvH38fVLzr4UWF0VpcA1jxUgxmVmwSQard%2BOjvb8t%2FUNT9nOcCPUwrAtQvnaVsVIL9IvCMd9MZPfQjZwuiBgBBOwe1pN%2F2ZcPokEiskjiCfHovLoKn%2F31KJdOLd%2BXlQ6iqAgqzq808et38lB3CoTcGhtK8mPxOZMoN8hsFa8WJwGj1wR8KY7D6%2BYLSn8N%2FpCgeAt8ySm3uVlcsevt71XNshsoAg9KXq5kMuIMzY4d%2F5ciPXgvwBurvj8hdFD5zyNpi7midC5Q5O%2FQ4DTNfmBAcAiWluKtSU0mq1ngWmUxo8Dq85GwDgLP%2FwypCix5uUVW8yDflCv0ka%2FBA%2FTBDz7jtbht8Fy%2FAEiC0WoFGRXGY4JB47YgVHlJuFADqm4nKSzpFc9O0EcIdoQj%2F4I553BsgE0Qi9rj9Hdy8U%2F%2FfSEQH9RzXDyGTMxnALH%2FMaVkhd0hkNlDocVmRDtOMbtw92%2BbrfvAsXl4go5nngD6yw%2F8aaMirOXwo04M4n5pVTwueiRchCtJW6ofZ8i5a469n%2BShfRIe4o3CI%2FSjpqXE0pLmO1Pbbe%2BAs6gxn8fBM7vjoQkKgu%2FYGP3r%2B9DuFw2Jtt3H2WntOoTSNc2uS2Auv%2B06lAK7bt%2FDNd1sNkEnHt2NuyS0Zr2vOoxUZFZO32f6nvBD3u9I9LdcSyFIaIYGyySscwUSNpnjBcJVZdHQLo9HhSdUNOWCYoh8WYhMz9156%2FYvhJmy7SAlZMo%2FuxxyaDozcgP4wKt%2FsSEVhadUq4lcqa3EZOvyeXEx5EmEqu5SU9x0n2jCAHiMptI2UDzMjb%2BATQsdi6MW5eyMDCBecOhecMDjGMQym%2F9c%2FNrKE0WsYLp341o%2BCvoDeUaA7FcunggeJ9KpkSYVkBzAFsjEheeYBOxbBy9XHtVF67iXWh1i9QpiDsw4laSEvGBe9z8Mke7krwXvpJA3z7RcLnXGrzYJbPSoiVxWWj7U80LJJlJlO3BvdBDt&__VIEWSTATEGENERATOR=8C427999&ctl00%24body%24TBData=11+lutego+2020", "method": "POST", "mode": "cors"
})
    .then(res => {
        console.log('Unpacking TERC...');
        res.body.pipe(unzipper.Extract({ path: 'tmp/terc' })).promise()
            .then(() => {
                extr()
            },
                e => console.log('Error', e));
    });

function extr() {
    const cit = [];
    const f = fs.readdirSync('tmp/terc').find(x => x.endsWith('.csv'));
    console.log('Done extracting:', f);
    const rs = fs.createReadStream('tmp/terc/' + f)
        .pipe(csvParser({ separator: ';', mapHeaders: ({ header, index }) => 'h' + index }));
    rs.on('data', async (data) => {
        rs.pause();
        if (data.h2) {
            let obj = {
                name: data.h4,
                terc: data.h0 + data.h1 + data.h2
            }
            if (!cit.find(z => z.terc == obj.terc)) {
                cit.push(obj);
                const terc = obj.terc;
                const urlShpes = `https://integracja.gugik.gov.pl/PRG/pobierz.php?teryt=${terc}&adresy`;
                console.log('Data download:', obj.name, urlShpes);
                const res = await fetch(urlShpes);
                await res.body.pipe(unzipper.Extract({ path: 'tmp/terc/shp/' + obj.terc })).promise();
                await new Promise(r => setTimeout(r, 5000));
            }
        }
        rs.resume();

    })
        .on('end', () => {

        });
}