#Team None Stock Market
Code Fellows 301 Final Project

##Team Members
• Reina
• Robert
• Vinh
• Luke

##Project Description
None Stock Market is a tool that helps you look at the state of the various indexes of US markets and gives you some tools to decide what potential investments you could make. You can also make a portfolio of stocks you want to keep an eye on or have already invested in.

##Problem Domain
People are always looking for a better way to determine what to invest in. There are countless tools out there to aid in making this determination.  Our tool offers a clean and concise way to keep track of the market, news, and stocks of interest.<br />  

As we began thinking through the problem more thoroughly we realized a tool such as ours could be expanded to cover more than just the US market (for example the Hong Kong stock exchange). 

##User Stories
• As a user, I want to see a homepage that is easily understood and interacting with it is intuitive.<br />  

• As a user, I want to see a navigation bar on the homepage, so that I can navigate to the different pages within the website.<br />  

• As a user, I want to be able to see that state of the markets worldwide from the homepage.<br />  

• As a user, I want to be able to search for stocks based on the company name or their ticker.<br />  

• As a user, on the specific stock’s page, I would like to be able to see all of the pertinent information that I would need to make a good investment decision.<br />  

• As a user, I would like an advanced search option where I could search based on categories of stocks (i.e. risk level, price range, small or large cap, etc.)<br />  

• As a user, I would like to make a portfolio of either stocks I own, or stocks on my watch list.<br />  

• As a user, I would like to see up to date information on the individual stocks (when the market is open, possibly after hours).<br />  

• As a user, I would like to be able to edit my portfolio, add and delete.<br />  

• As a user, I would like to be able to log in and out to see my portfolio.<br />  

• As a user, I would like to query historical data to see hypothetically how much I could have made if I invested in the past (stretch). <br />  

##APIs
We used the Investors Exchange API to get all the data needed for individual stocks and data to supply for the charts. <br />
Endpoint: "https://investors-exchange-iex-trading.p.rapidapi.com/stock/aapl/quote" <br />  

Sample:
{40 items
"symbol":"AAPL"
"companyName":"Apple Inc."
"primaryExchange":"Nasdaq Global Select"
"sector":"Technology"
"calculationPrice":"close"
"open":186.27
"openTime":1557927000361
"close":190.92
"closeTime":1557950400686
"high":191.75
"low":186.02
"latestPrice":190.92
"latestSource":"Close"
"latestTime":"May 15, 2019"
"latestUpdate":1557950400686
"latestVolume":26010088
"iexRealtimePrice":191.03
"iexRealtimeSize":100
"iexLastUpdated":1557950399821
"delayedPrice":190.92
"delayedPriceTime":1557950400686
"extendedPrice":190.51
"extendedChange":-0.41
"extendedChangePercent":-0.00215
"extendedPriceTime":1557953999270
"previousClose":188.66
"change":2.26
"changePercent":0.01198
"iexMarketPercent":0.03519
"iexVolume":915295
"avgTotalVolume":28736911
"iexBidPrice":0
"iexBidSize":0
"iexAskPrice":0
"iexAskSize":0
"marketCap":878437239000
"peRatio":15.7
"week52High":233.47
"week52Low":142
"ytdChange":0.2163800886095262
}

Endpoint: "https://investors-exchange-iex-trading.p.rapidapi.com/stock/aapl/chart/3m"
Sample: 
{12 items
"date":"2019-02-13"
"open":170.7325
"high":171.8184
"low":169.2682
"close":169.5272
"volume":22490233
"unadjustedVolume":22490233
"change":-0.707276
"changePercent":-0.415
"vwap":170.3478
"label":"Feb 13, 19"
"changeOverTime":0
}

##Acknowledgments

##License
This project is licensed under the MIT License - see the LICENSE file for details.
