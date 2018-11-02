<?php

namespace App\Http\Managers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemManager
{
    /**
     * Get all items for the search query
     * @param array $params
     * @return []
     */
    public function getItems(array $params = [])
    {
        $items = Item::query();
        return $items->get();
    }
}