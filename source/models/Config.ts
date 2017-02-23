import { template } from "lodash";

export class Config {
    gamesDataURL = "client.json";
    gameIconURLTemplate = template("client/<%= gameID %>/Icon64.png");
    gameKeys = ['Id', 'Name', 'SupportsAddons', 'SupportsVoice', 'order', 'Slug', 'fileName', 'section', 'icon'];
    fetchStartingMsg = "Fetching the games data!";
    fetchErrorMsg = "There was an error with the fetching of the games data!";
    fetchSuccessMsg = "Done with fetching of the games data!";
    fetchDetailsMsg = template("Showing details for <%= fileID %>");
    api = {"list": {"url": template("http://thegamesdb.net/api/GetGamesList.php?name=<%= nameID %>"), "art":{"url": template("http://thegamesdb.net/api/GetArt.php?id=<%= artID %>")}};
}
