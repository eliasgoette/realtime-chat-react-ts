import React, { FC, SetStateAction, useEffect, useState } from "react";
import styles from "./ChatArea.module.css";
import ChatBubble, { chatMessage } from "./ChatBubble";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { database } from "../../services/firebase";

interface ChatAreaProps {
    chatId : string
}

const ChatArea : FC<ChatAreaProps> = ({chatId, ...props}) => {
    const [messages, setMessages] = useState<chatMessage[]>([]);

    useEffect(() => {
        const messageRef = ref(database, `/chats/${chatId}`);
        const unsubscribe = onValue(messageRef, displayLatestMessages);

        return () => unsubscribe();
    }, [chatId]);

    const displayLatestMessages : (snapshot : DataSnapshot) => void = (snapshot) => {
        let latestMessages : chatMessage[] = snapshot.val() ?? [];
        setMessages(latestMessages);
    };

    // let messages : chatMessage[] = [
    //     {
    //         content: "Kale chips single-origin coffee slow-carb, bruh helvetica salvia.",
    //         timestamp: Date.now() - 8,
    //         authorUid: "U1"
    //     },
    //     {
    //         content: "Praxis pabst chia master cleanse fit tofu.",
    //         timestamp: Date.now() - 7,
    //         authorUid: "U2"
    //     },
    //     {
    //         content: "Seitan same umami banh mi helvetica, before they sold out activated charcoal deep v hella shaman bodega boys sriracha dreamcatcher.",
    //         timestamp: Date.now() - 6,
    //         authorUid: "U1"
    //     },
    //     {
    //         content: "Kombucha single-origin coffee vape lo-fi DIY.",
    //         timestamp: Date.now() - 5,
    //         authorUid: "U2"
    //     },
    //     {
    //         content: "Mixtape iceland man braid, pour-over meh prism 90's praxis hell of.",
    //         timestamp: Date.now() - 4,
    //         authorUid: "U1"
    //     },
    //     {
    //         content: "Banh mi pickled raclette sartorial organic flexitarian JOMO freegan stumptown bicycle rights try-hard messenger bag chia la croix tote bag.",
    //         timestamp: Date.now() - 3,
    //         authorUid: "U2"
    //     },
    //     {
    //         content: "Mumblecore slow-carb portland vexillologist cloud bread. Vape snackwave photo booth paleo.",
    //         timestamp: Date.now() - 2,
    //         authorUid: "U1"
    //     },
    //     {
    //         content: "Polaroid succulents single-origin coffee umami, skateboard pour-over edison bulb.",
    //         timestamp: Date.now() - 1,
    //         authorUid: "U2"
    //     },
    //     {
    //         content: "Kickstarter palo santo cupping lo-fi farm-to-table, gorpcore knausgaard.",
    //         timestamp: Date.now(),
    //         authorUid: "U1"
    //     }
    // ];

    return(
        <div className={styles.chatArea}>
            {messages.map((m, i) => <ChatBubble {...m} key={i}/>)}
        </div>
    );
}

export default ChatArea;