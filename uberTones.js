/*
 * Title: uberTones 0.1
 *
 * Description:
 * uberTones brings audio notifications to ubersmith's
 * ticket queue. The current release relies on the
 * audio api of modern web browsers to play a scale
 * of custom composed notification tones which escalate
 * in urgency from the initial minute of an unresponded-to ticket's
 * arrival through to 1 hour post arrival of an unresponded-to ticket's.
 *
 *
 * Author: Joe J Hacobian
 * Copyright (C) 2014  Joe J Hacobian
 *
 * For uncompressed source, visit my uberTones repo on Github:
 * https://github.com/Node0/uberTones
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */


window.setInterval( function() {

    var userName = "null",
        ticketOwner = new RegExp(userName, "i");

    //var generalSearchTermList = [""];

    var tktListIframe = document.getElementsByTagName('iframe')[1],
        tktListContainer = tktListIframe.contentDocument.querySelector(
            'form#t_list[action*="?"] div#list_container.container'),
        tktListTable = tktListContainer.getElementsByTagName('table')[1],
        tktList = tktListTable.getElementsByTagName('tr');

    for(var tktRow = 0; tktRow < tktList.length; tktRow++) {

        //Check to make sure this is actually a ticket row
        if(tktList[tktRow].id.match(/(ticket)(\d{2,12})/)){
            var thisTktColList = tktList[tktRow].getElementsByTagName('td');

            //TODO: Check ticket ownership against a list of users and don't notify for their tickets
            if(thisTktColList[9].textContent.match(ticketOwner) != null){
                //console.log("Ticket: " + tktList[tktRow].id + " has been assigned to " + ticketOwner + ", ignoring.");
            } else {

                var updatedCol = thisTktColList[5];
                if(updatedCol.textContent.match(/none/i)) {
                    //tktList[tktRow].className = "someClass";
                    //console.log("Ticket: " + tktList[tktRow].id + " matched.");

                    // Grab the time from the 'opened' column, (this is only applicable when the 'updated' contains 'none')
                    // conditional logic for these cases will be required and is forthcoming.
                    console.log(thisTktColList[4].childNodes[0].textContent.match(/(\d{1,2})(\s)(minutes)/i)[1]);
                }

            }


        }
    }

}, 3000);