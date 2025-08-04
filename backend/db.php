<?php
function getDB() {
    $file = __DIR__ . '/data.json';
    if(!file_exists($file)){
        file_put_contents($file, json_encode([]));
    }
    $json = file_get_contents($file);
    return json_decode($json, true);
}

function saveDB($data) {
    $file = __DIR__ . '/data.json';
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}
